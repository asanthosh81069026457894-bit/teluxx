// useSubscription — stubbed post-payment-removal. Returns a full-access
// snapshot synchronously so any caller that destructures the result keeps
// compiling. The real subscription DB row is no longer read from the app.

import { useSyncExternalStore } from "react";

import {
  getSubscriptionServerSnapshot,
  getSubscriptionSnapshot,
  subscribeSubscription,
} from "@/lib/subscription";

export function useSubscription() {
  return useSyncExternalStore(
    subscribeSubscription,
    getSubscriptionSnapshot,
    getSubscriptionServerSnapshot,
  );
}
