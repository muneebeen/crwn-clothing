export const CATEGORY_INITIAL_STATE = {
  categoriesMap: {},
};
export const SET_CATEGORY_TYPE = {
  SET_CURRENT_CATEGORY: "SET_CURRENT_CATEGORY",
};

export const categoryReducer = (
  state = CATEGORY_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORY_TYPE.SET_CURRENT_CATEGORY:
      console.log("I am in here");
      return {
        ...state,
        categoriesMap: payload,
      };

    default:
      return state;
  }
};
