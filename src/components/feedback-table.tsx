"use client";

import { formatDistanceToNow } from "date-fns";
import type { InferSelectModel } from "drizzle-orm";
import {
  Bug,
  ChevronLeft,
  ChevronRight,
  Eye,
  Lightbulb,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import { useState, useMemo } from "react";
import type { feedbacks } from "@/db/schema";
import { useRealtime } from "@/lib/realtime-client";
import { Button } from "./ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription // Added for accessibility
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Feedback = InferSelectModel<typeof feedbacks>;

const typeIcons = {
  bug: Bug,
  idea: Lightbulb,
  other: MessageCircle,
};

const typeColors = {
  bug: "text-red-500 bg-red-500/10 border-red-500/30",
  idea: "text-yellow-500 bg-yellow-500/10 border-yellow-500/30",
  other: "text-blue-500 bg-blue-500/10 border-blue-500/30",
};

const statusStyles = {
  new: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  read: "text-zinc-400 bg-zinc-500/10 border-zinc-500/30",
  resolved: "text-green-400 bg-green-500/10 border-green-500/30",
};

const ITEMS_PER_PAGE = 10;

interface FeedbackTableProps {
  projectId: string;
  initialFeedbacks: Feedback[];
}

export function FeedbackTable({
  projectId,
  initialFeedbacks,
}: FeedbackTableProps) {
  const [feedbackList, setFeedbackList] =
    useState<Feedback[]>(initialFeedbacks);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null,
  );

  useRealtime({
    events: ["feedback:new"],
    onData: ({ event, data }) => {
      if (event === "feedback:new" && data.projectId === projectId) {
        const newFeedback: Feedback = {
          ...data.feedback,
          createdAt: data.feedback.createdAt
            ? new Date(data.feedback.createdAt)
            : null,
        };
        setFeedbackList((prev) => [newFeedback, ...prev]);
      }
    },
  });

  const filteredFeedbacks = useMemo(() => {
    return feedbackList.filter((f) => {
      const matchesSearch =
        !search ||
        f.message.toLowerCase().includes(search.toLowerCase()) ||
        f.userEmail?.toLowerCase().includes(search.toLowerCase());
      const matchesType = !typeFilter || f.type === typeFilter;
      const matchesStatus = !statusFilter || f.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [feedbackList, search, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredFeedbacks.length / ITEMS_PER_PAGE);
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const clearFilters = () => {
    setSearch("");
    setTypeFilter(null);
    setStatusFilter(null);
    setCurrentPage(1);
  };

  const hasActiveFilters = search || typeFilter || statusFilter;

  if (feedbackList.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-12 text-center border border-dashed border-zinc-800 rounded-sm bg-zinc-900/20">
        <div className="p-4 bg-zinc-900 rounded-full">
          <MessageCircle className="h-8 w-8 text-zinc-600" />
        </div>
        <div className="max-w-xs">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
            Awaiting Data
          </h2>
          <p className="text-sm text-zinc-500 font-mono">
            No feedback events detected. Ensure the widget is active on your
            target domain.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search messages..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9 bg-zinc-950 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 font-mono text-xs h-9"
          />
        </div>

        <div className="flex items-center gap-2">
          {(["bug", "idea", "other"] as const).map((type) => {
            const Icon = typeIcons[type];
            const isActive = typeFilter === type;
            return (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => {
                  setTypeFilter(isActive ? null : type);
                  setCurrentPage(1);
                }}
                className={`h-8 px-3 border font-mono text-xs uppercase ${
                  isActive
                    ? typeColors[type]
                    : "border-zinc-800 text-zinc-500 bg-transparent hover:bg-zinc-900 hover:text-zinc-300"
                }`}
              >
                <Icon className="h-3 w-3 mr-1.5" />
                {type}
              </Button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {(["new", "read", "resolved"] as const).map((status) => {
            const isActive = statusFilter === status;
            return (
              <Button
                key={status}
                variant="outline"
                size="sm"
                onClick={() => {
                  setStatusFilter(isActive ? null : status);
                  setCurrentPage(1);
                }}
                className={`h-8 px-3 border font-mono text-xs uppercase ${
                  isActive
                    ? statusStyles[status]
                    : "border-zinc-800 text-zinc-500 bg-transparent hover:bg-zinc-900 hover:text-zinc-300"
                }`}
              >
                {status}
              </Button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 text-zinc-500 hover:text-white"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}

        <div className="ml-auto text-xs font-mono text-zinc-500">
          {filteredFeedbacks.length} of {feedbackList.length} entries
        </div>
      </div>

      {/* Table */}
      <div className="border border-zinc-800 rounded-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/50">
              <TableHead className="text-zinc-400 font-mono text-xs uppercase w-[100px]">
                Type
              </TableHead>
              <TableHead className="text-zinc-400 font-mono text-xs uppercase">
                Message
              </TableHead>
              <TableHead className="text-zinc-400 font-mono text-xs uppercase w-[180px]">
                User
              </TableHead>
              <TableHead className="text-zinc-400 font-mono text-xs uppercase w-[100px]">
                Status
              </TableHead>
              <TableHead className="text-zinc-400 font-mono text-xs uppercase w-[140px]">
                Date
              </TableHead>
              <TableHead className="text-zinc-400 font-mono text-xs uppercase w-[60px]">
                View
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFeedbacks.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-zinc-500 font-mono text-sm"
                >
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              paginatedFeedbacks.map((feedback) => {
                const Icon =
                  typeIcons[feedback.type as keyof typeof typeIcons] ||
                  MessageCircle;
                const typeColor =
                  typeColors[feedback.type as keyof typeof typeColors] ||
                  typeColors.other;
                const statusStyle =
                  statusStyles[feedback.status as keyof typeof statusStyles] ||
                  statusStyles.new;

                return (
                  <TableRow
                    key={feedback.id}
                    className="border-zinc-800 hover:bg-zinc-900/50 cursor-pointer"
                    onClick={() => setSelectedFeedback(feedback)}
                  >
                    <TableCell>
                      <div
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border ${typeColor}`}
                      >
                        <Icon className="h-3 w-3" />
                        <span className="font-mono text-xs uppercase">
                          {feedback.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="text-sm text-zinc-300 truncate">
                        {feedback.message}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono text-zinc-500">
                        {feedback.userEmail || "Anonymous"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-sm border font-mono text-[10px] uppercase ${statusStyle}`}
                      >
                        {feedback.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-mono text-zinc-600">
                        {feedback.createdAt &&
                          formatDistanceToNow(new Date(feedback.createdAt), {
                            addSuffix: true,
                          })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-zinc-500 hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFeedback(feedback);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono text-zinc-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 px-2 border-zinc-800 text-zinc-400 hover:text-white bg-transparent disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-8 w-8 p-0 border font-mono text-xs ${
                    currentPage === pageNum
                      ? "border-orange-500 text-orange-500 bg-orange-500/10"
                      : "border-zinc-800 text-zinc-500 bg-transparent hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 px-2 border-zinc-800 text-zinc-400 hover:text-white bg-transparent disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <Dialog
        open={!!selectedFeedback}
        onOpenChange={(open) => {
          if (!open) setSelectedFeedback(null);
        }}
      >
        <DialogContent className="bg-zinc-950 border-zinc-800 max-w-2xl w-full max-h-[85vh] overflow-y-auto flex flex-col p-0 gap-0">
          <DialogHeader className="p-6 pb-2 sticky top-0 bg-zinc-950 z-10 border-b border-zinc-800/50">
            <DialogTitle className="font-mono text-sm uppercase tracking-wider text-zinc-300">
              Feedback Detail
            </DialogTitle>
            <DialogDescription className="sr-only">
              Detailed view of the selected feedback item including message, status, and metadata.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-6">
            {selectedFeedback && (
              <>
                {/* Header: Type, Status, Date */}
                <div className="flex flex-wrap items-center gap-3">
                  {(() => {
                    const Icon =
                      typeIcons[
                        selectedFeedback.type as keyof typeof typeIcons
                      ] || MessageCircle;
                    const typeColor =
                      typeColors[
                        selectedFeedback.type as keyof typeof typeColors
                      ] || typeColors.other;
                    return (
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border ${typeColor}`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span className="font-mono text-xs uppercase">
                          {selectedFeedback.type}
                        </span>
                      </div>
                    );
                  })()}
                  <span
                    className={`inline-block px-2 py-0.5 rounded-sm border font-mono text-[10px] uppercase ${
                      statusStyles[
                        selectedFeedback.status as keyof typeof statusStyles
                      ] || statusStyles.new
                    }`}
                  >
                    {selectedFeedback.status}
                  </span>
                  <span className="text-xs font-mono text-zinc-600 ml-auto">
                    {selectedFeedback.createdAt &&
                      formatDistanceToNow(new Date(selectedFeedback.createdAt), {
                        addSuffix: true,
                      })}
                  </span>
                </div>

                {/* Message Body */}
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm">
                  <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
                    {selectedFeedback.message}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-zinc-900/30 rounded-sm border border-zinc-800/50">
                    <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">
                      User Email
                    </p>
                    <p className="text-zinc-300 font-mono truncate" title={selectedFeedback.userEmail || ""}>
                      {selectedFeedback.userEmail || "Anonymous"}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/30 rounded-sm border border-zinc-800/50">
                    <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">
                      Feedback ID
                    </p>
                    <p className="text-zinc-300 font-mono text-xs truncate" title={selectedFeedback.id}>
                      {selectedFeedback.id}
                    </p>
                  </div>
                </div>

                {/* Screenshot */}
                {selectedFeedback.imageUrl && (
                  <div>
                    <p className="text-[10px] font-mono uppercase text-zinc-500 mb-2">
                      Attached Screenshot
                    </p>
                    <div className="border border-zinc-800 rounded-sm overflow-hidden bg-black p-2 flex justify-center">
                      {/* biome-ignore lint/a11y/useAltText: user content */}
                      <img
                        src={selectedFeedback.imageUrl}
                        className="rounded-sm max-h-[400px] w-auto object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Metadata */}
                {selectedFeedback.metadata ? (
                  <div>
                    <p className="text-[10px] font-mono uppercase text-zinc-500 mb-2">
                      Metadata
                    </p>
                    <pre className="p-3 bg-black border border-zinc-800 rounded-sm text-xs text-zinc-400 font-mono overflow-auto max-h-[200px]">
                      {JSON.stringify(selectedFeedback.metadata, null, 2)}
                    </pre>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}