import { sandboxEnv } from 'environment';

export function getStaticContent(reletiveUrl: string) {
  return `${sandboxEnv.urlBase}${reletiveUrl}`;
}

export default getStaticContent;
