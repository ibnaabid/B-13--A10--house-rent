"use client";

import { Pagination } from "@heroui/react";

export default function PaginationCustomIcons({
  page,
  setPage,
  totalPages,
}) {
  return (
    <Pagination className="justify-center">
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={page === 1}
            onPress={() => setPage(page - 1)}
          >
            <Pagination.PreviousIcon />
            <span className="text-white font-bold">Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link
              isActive={p === page}
              onPress={() => setPage(p)}
            >
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}

        <Pagination.Item>
          <Pagination.Next
            isDisabled={page === totalPages}
            onPress={() => setPage(page + 1)}
          >
            <span className="text-green-600 font-bold">Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}