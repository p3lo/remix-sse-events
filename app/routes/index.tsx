import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { addIssue, getIssues } from '~/data';

import type { ActionArgs } from '@remix-run/node';
import { emitter } from '~/services/emitter.server';
import React from 'react';
import { useRealTimeLoaderData } from '~/use-loaderData';

export async function loader({ request }: LoaderArgs) {
  return json({ issues: await getIssues() });
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  try {
    await addIssue({
      id: body.id.toString(),
      title: '',
      userId: '',
      priority: 0,
      status: 0,
    });

    const hasListener = emitter.emit('message', body.id.toString());
    console.log('hasListener', hasListener);
    console.log('emitter', emitter.listeners('message'));
    console.log('emitter eventnames', emitter.eventNames());

    return json(null, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}

export default function Index() {
  let { issues } = useLoaderData<typeof loader>();
  let actionData = useActionData<typeof action>();

  let data = useRealTimeLoaderData('/subscription', {
    event: 'new-message',
  });

  React.useEffect(() => {
    console.log('🚀 ~ file: index.tsx:59 ~ Index ~ data', data);
  }, [data]);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <Form method="post">
        <input name="id" placeholder="id" />
        <button type="submit">Submit</button>
      </Form>
      {issues.map((issue) => (
        <div key={issue.id} style={{ marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>{issue.title}</h3>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>
            <span style={{ marginRight: '1rem' }}>#{issue.id}</span>
            <span style={{ marginRight: '1rem' }}>Created by {issue.userId}</span>
            <span style={{ marginRight: '1rem' }}>Priority: {issue.priority}</span>
            <span style={{ marginRight: '1rem' }}>Status: {issue.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
