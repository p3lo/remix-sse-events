import type { LoaderArgs } from '@remix-run/node';

import { eventStream } from 'remix-utils';
import { emitter } from '~/services/emitter.server';

export async function loader({ request }: LoaderArgs) {
  return eventStream(request.signal, function setup(send) {
    function handle(message: string) {
      send({ event: 'new-message', data: message });
    }

    emitter.on('message', handle);
    console.log('🚀 ~ file: subscription.tsx:13 ~ loader ~ emitter', emitter.eventNames());
    console.log('🚀 ~ file: subscription.tsx:14 ~ loader ~ emitter', emitter.listeners('message'));
    return function clear() {
      emitter.off('message', handle);
      console.log('🚀 ~ file: subscription.tsx:17 ~ loader ~ emitterclear', emitter.eventNames());
    };
  });
}
