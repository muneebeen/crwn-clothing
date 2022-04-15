import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./RootReducer";

const middleWare = [logger];
const componsedEnhances = compose(applyMiddleware(...middleWare));

export const store = createStore(rootReducer, undefined, componsedEnhances);
