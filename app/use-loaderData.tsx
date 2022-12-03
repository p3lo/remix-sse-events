import type { SerializeFrom } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import { useEventSource } from 'remix-utils';

type EventSourceOptions = {
  init?: EventSourceInit;
  event?: string;
};

export function useRealTimeLoaderData<LoaderFunction>(url: URL | string, options: EventSourceOptions) {
  let loaderData = useLoaderData<LoaderFunction>();
  let eventData = useEventSource(url, options);
  return React.useMemo<SerializeFrom<LoaderFunction>>(() => {
    if (!eventData) return loaderData;
    return JSON.parse(eventData);
  }, [loaderData, eventData]);
}
