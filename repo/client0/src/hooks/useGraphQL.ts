'use client';

import { useQuery as useUrqlQuery, useMutation as useUrqlMutation } from 'urql';
import { DocumentNode } from 'graphql';

// رفع مشکل تایپ‌ها با استفاده از any
export function useQuery<Data = any>(
  query: DocumentNode,
  variables?: any
) {
  return useUrqlQuery<Data>({
    query,
    variables,
  });
}

export function useMutation<Data = any>(
  mutation: DocumentNode
) {
  return useUrqlMutation<Data>(mutation);
}