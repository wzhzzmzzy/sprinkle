import { writable } from "svelte/store";
import produce from "immer";
import { USER_ROLE } from "../types/user";

interface PageStatusStore {
  checkingUserAuth: boolean
  UserRole: USER_ROLE
}

export const store = writable({
  checkingUserAuth: false,
  UserRole: USER_ROLE.Anonymous
} as PageStatusStore)

export function dispatch(fn: (draft: PageStatusStore) => void) {
  store.update(state => produce(state, fn))
}

export function toggleUserAuthChecking(value: boolean) {
  dispatch(draft => {
    draft.checkingUserAuth = value
  })
}