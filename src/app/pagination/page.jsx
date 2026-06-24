"use client";

import { Pagination } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function PaginationCustomIcons({
  page,
  setPage,
  totalPages,
}) {
  return (
    <div className="mt-6 flex justify-center">

      <Pagination>
        <Pagination.Content>

          <Pagination.Item>
            <Pagination.Previous
              isDisabled={page === 1}
              onPress={() => setPage(page - 1)}
            >
              <Pagination.PreviousIcon>
                <Icon icon="gravity-ui:arrow-left" />
              </Pagination.PreviousIcon>
              Back
            </Pagination.Previous>
          </Pagination.Item>

          {/* NUMBERS */}
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

          {/* NEXT */}
          <Pagination.Item>
            <Pagination.Next className="text-white font-bold hover:text-blue-600 font-bold"
              isDisabled={page === totalPages}
              onPress={() => setPage(page + 1)}
            >
              Forward
              <Pagination.NextIcon>
                <Icon icon="gravity-ui:arrow-right" />
              </Pagination.NextIcon>
            </Pagination.Next>
          </Pagination.Item>

        </Pagination.Content>
      </Pagination>

    </div>
  );
}