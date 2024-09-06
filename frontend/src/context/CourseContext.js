import { createContext, useReducer } from 'react';

export const CourseContext = createContext();

export const coursesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COURSES':
      return {
        courses: action.payload,
      };
    case 'CREATE_COURSE':
      return {
        courses: [action.payload, ...state.courses],
      };
    case 'DELETE_COURSE':
      return {
        courses: state.courses.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CoursesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(coursesReducer, {
    courses: null,
  });

  return (
    <CourseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};
