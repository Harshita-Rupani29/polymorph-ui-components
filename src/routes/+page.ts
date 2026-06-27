import { redirect } from '@sveltejs/kit';
import { firstSlug, resolveComponentPath } from './components/_nav';

export function load() {
  redirect(307, resolveComponentPath(firstSlug));
}
