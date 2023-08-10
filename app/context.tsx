import { createContext } from 'react';

const OnActionClickContext = createContext<(productName: string) => void>(() => {});

export { OnActionClickContext };