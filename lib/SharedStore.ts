import { useEffect, useState, Dispatch } from "react";
import { copy } from "./Utils";

function loadStorage<T = any>(store: string): T {
  if(!store)
    return null

  try {
    return <any>JSON.parse(localStorage.getItem(store))
  }catch(e) {
    return null
  }
}

function saveStorage(store: string, data: any) {
  if(!store) return null
  localStorage.setItem(store, JSON.stringify(data))
}

export function createShareStore<T = any>(initialState?: T, storage = '') {
  let load = loadStorage<T>(storage)
  let state = load ? load : initialState
  let extend = null
  let initial = true
  let listeners: Dispatch<T>[] = [] 

  function getNew(newState: T): T {
    return copy(newState)
  }

  function getState(): Readonly<T> {
    return state
  }

  function onChange(listener: Dispatch<T>) {
    listener['c'] = true

    let index = listeners.indexOf(listener)

    if(index == -1)
      listeners.push(listener)
  }

  function offChange(listener?: Dispatch<T>) {
    if(!listener)
      while(listener = listeners.find(e => e['c'])) 
        offChange(listener)

    let index = listeners.indexOf(listener)
    
    if(index !== -1)
      listeners.splice(index, 1)
  }

  function setState(newState: T) {
    if(initial) {
      initial = false

      extend = newState && 
        typeof newState == 'object' 
          && !Array.isArray(newState)
    }

    state = getNew(newState)
    saveStorage(storage, state)

    for(let dispatcher of listeners)
      dispatcher(state)
  }

  function useSharedState(newState: T = state): [T, typeof setState] {
    let [s, dispatcher] = useState(newState)
    
    useEffect(() => {
      if(typeof newState !== 'undefined')
        setState(newState)
    }, [])

    useEffect(() => {
      listeners.push(dispatcher)
      
      return () => {
        let index = listeners.indexOf(dispatcher)

        if(index !== -1)
          listeners.splice(index, 1)
      }
    }, [])

    return [s, setState]
  }

  setState(state)

  return  {
    useState: useSharedState, 
    get: getState, 
    set: setState, 
    onChange, 
    offChange
  }
}