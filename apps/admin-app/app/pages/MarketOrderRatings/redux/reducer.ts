import { createReducer } from 'reduxsauce';
import isEmpty from 'lodash/isEmpty';

import {
  Tag,
  RatingTag,
  TagPayload,
} from '../../../api/marketOrderRatings/index';
import { Types } from './actions';
import { ReducerAPIState } from '@shared/types/reducerAPIState';

export const INITIAL_STATE: ReducerAPIState = {
  getRatingTags: {
    data: [],
    isPending: false,
    error: null,
  },
  createRatingTag: {
    data: [],
    isPending: false,
    error: null,
  },
  updateRatingTag: {
    data: [],
    isPending: false,
    error: null,
  },
  updateRatingPlaceholder: {
    data: {},
    isPending: false,
    error: null,
  },
  createRatingPlaceholder: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getRatingTagsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getRatingTags: {
      ...INITIAL_STATE.getRatingTags,
      isPending: true,
    },
  };
};

export const getRatingTagsSuccess = (state = INITIAL_STATE, { data }: any) => {
  return {
    ...state,
    getRatingTags: {
      ...INITIAL_STATE.getRatingTags,
      isPending: false,
      data: data?.ratingOptions,
    },
  };
};

export const getRatingTagsFailure = (state = INITIAL_STATE, { error }: any) => {
  return {
    ...state,
    getRatingTags: {
      ...INITIAL_STATE.getRatingTags,
      isPending: false,
      error,
    },
  };
};
export const multiUpdateRatingTagsRequest = (state = INITIAL_STATE) => {
  return { ...state };
};

export const multiUpdateRatingTagsSuccess = (
  state = INITIAL_STATE,
  { data }: { data: any },
) => {
  const { tags, rating } = data;
  const options = state.getRatingTags.data.map((option: { rating: string }) => {
    if (option.rating === rating.rating) {
      return { ...option, tags };
    }
    return option;
  });
  return {
    ...state,
    getRatingTags: {
      ...state.getRatingTags,
      data: options,
    },
  };
};

export const multiUpdateRatingTagsFailure = (
  state = INITIAL_STATE,
  { error }: { error: string },
) => {
  return {
    ...state,
    getRatingTags: {
      ...INITIAL_STATE.getRatingTags,
      isPending: false,
      error,
    },
  };
};

export const createRatingTagRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createRatingTag: {
      ...INITIAL_STATE.createRatingTag,
      isPending: true,
    },
  };
};

export const createRatingTagSuccess = (
  state = INITIAL_STATE,
  { data }: { data: any },
) => {
  const { priority, reason, title, _id, rating } = data;
  const { getRatingTags: ratingTags } = state;
  const updatedTags = ratingTags.data?.map((ratingTag: RatingTag) => {
    if (ratingTag.rating === rating) {
      Object.assign(ratingTag, { tags: [...ratingTag.tags, { priority, reason, title, _id, new: true }] });
    }
    return ratingTag;
  });
  return {
    ...state,
    getRatingTags: {
      ...INITIAL_STATE.getRatingTags,
      data: updatedTags,
    },
  };
};

export const createRatingTagFailure = (
  state = INITIAL_STATE,
  { error }: { error: string },
) => {
  return {
    ...state,
    createRatingTag: {
      ...INITIAL_STATE.createRatingTag,
      isPending: false,
      error,
    },
  };
};
export const updateRatingTagRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateRatingTag: {
      ...INITIAL_STATE.updateRatingTag,
      isPending: true,
    },
  };
};

export const updateRatingTagSuccess = (
  state = INITIAL_STATE,
  { data }: { data: any },
) => {
  const { _id, title, reason, priority, domainType } = data;
  const { getRatingTags: ratingTags } = state;
  ratingTags.data?.forEach((rating: RatingTag) => {
    Object.assign(rating, {
      tags: rating.tags?.map((tag: TagPayload) => {
        if (tag?._id === _id) {
          return { ...tag, title, reason, priority, domainType };
        }
        return tag;
      }),
    });
  });
  return {
    ...state,
    getRatingTags: {
      ...INITIAL_STATE.getRatingTags,
      data: ratingTags.data,
    },
  };
};

export const updateRatingTagFailure = (
  state = INITIAL_STATE,
  { error }: { error: string },
) => {
  return {
    ...state,
    updateRatingTag: {
      ...INITIAL_STATE.updateRatingTag,
      isPending: false,
      error,
    },
  };
};

export const deleteRatingTagSuccess = (
  state = INITIAL_STATE,
  { id }: { id: string },
) => {
  const { getRatingTags: ratingTags } = state;
  ratingTags.data?.forEach((rating: RatingTag) => {
    Object.assign(rating, { tags: rating.tags?.filter((tag: TagPayload) => tag?._id !== id) });
  });
  return {
    ...state,
    getRatingTags: {
      ...INITIAL_STATE.getRatingTags,
      data: ratingTags.data,
    },
  };
};

export const deleteRatingTagFailure = (
  state = INITIAL_STATE,
  { error }: { error: string },
) => {
  return {
    ...state,
    deleteRatingTag: {
      ...INITIAL_STATE.deleteRatingTag,
      isPending: false,
      error,
    },
  };
};

export const updateRatingPlaceholderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    updateRatingPlaceholder: {
      ...INITIAL_STATE.updateRatingPlaceholder,
      isPending: true,
    },
  };
};

export const updateRatingPlaceholderSuccess = (
  state = INITIAL_STATE,
  { data }: { data: any },
) => {
  const { _id, title } = data;
  const { getRatingTags: ratingTags } = state;
  ratingTags.data?.forEach((rating: any) => {
    const { placeholder } = rating;
    if (_id === placeholder?._id) {
      Object.assign(rating, { placeholder: { ...placeholder, ...title } });
    }
  });
  return {
    ...state,
    getRatingTags: {
      ...INITIAL_STATE.getRatingTags,
      data: ratingTags.data,
    },
  };
};

export const updateRatingPlaceholderFailure = (
  state = INITIAL_STATE,
  { error }: { error: string },
) => {
  return {
    ...state,
    updateRatingPlaceholder: {
      ...INITIAL_STATE.updateRatingPlaceholder,
      isPending: false,
      error,
    },
  };
};
export const createRatingPlaceholderRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    createRatingPlaceholder: {
      ...INITIAL_STATE.createRatingPlaceholder,
      isPending: true,
    },
  };
};

export const createRatingPlaceholderSuccess = (
  state = INITIAL_STATE,
  { data }: { data: any },
) => {
  const { rating, title } = data;
  const ratingTags = state?.getRatingTags?.data;
  const selectedTag = ratingTags.find((tag: Tag) => tag.rating === rating);
  if (!isEmpty(selectedTag)) {
    ratingTags?.forEach((tag: Tag) => {
      if (tag?.rating === rating) {
        Object.assign(tag, { placeholder: title });
      }
    });
  }
  else {
    ratingTags?.splice(rating, 0, { tags: [], rating, placeholder: title });
  }
  return {
    ...state,
    getRatingTags: {
      ...INITIAL_STATE.getRatingTags,
      data: ratingTags,
    },
  };
};

export const createRatingPlaceholderFailure = (
  state = INITIAL_STATE,
  { error }: { error: string },
) => {
  return {
    ...state,
    createRatingPlaceholder: {
      ...INITIAL_STATE.createRatingPlaceholder,
      isPending: false,
      error,
    },
  };
};

export const deleteRatingTagRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteRatingTag: {
      ...INITIAL_STATE.deleteRatingTag,
      isPending: true,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_RATING_TAGS_REQUEST]: getRatingTagsRequest,
  [Types.GET_RATING_TAGS_SUCCESS]: getRatingTagsSuccess,
  [Types.GET_RATING_TAGS_FAILURE]: getRatingTagsFailure,
  [Types.CREATE_RATING_TAG_REQUEST]: createRatingTagRequest,
  [Types.CREATE_RATING_TAG_SUCCESS]: createRatingTagSuccess,
  [Types.CREATE_RATING_TAG_FAILURE]: createRatingTagFailure,
  [Types.UPDATE_RATING_TAG_REQUEST]: updateRatingTagRequest,
  [Types.UPDATE_RATING_TAG_SUCCESS]: updateRatingTagSuccess,
  [Types.UPDATE_RATING_TAG_FAILURE]: updateRatingTagFailure,
  [Types.UPDATE_RATING_PLACEHOLDER_REQUEST]: updateRatingPlaceholderRequest,
  [Types.UPDATE_RATING_PLACEHOLDER_SUCCESS]: updateRatingPlaceholderSuccess,
  [Types.UPDATE_RATING_PLACEHOLDER_FAILURE]: updateRatingPlaceholderFailure,
  [Types.CREATE_RATING_PLACEHOLDER_REQUEST]: createRatingPlaceholderRequest,
  [Types.CREATE_RATING_PLACEHOLDER_SUCCESS]: createRatingPlaceholderSuccess,
  [Types.CREATE_RATING_PLACEHOLDER_FAILURE]: createRatingPlaceholderFailure,
  [Types.DELETE_RATING_TAG_REQUEST]: deleteRatingTagRequest,
  [Types.DELETE_RATING_TAG_SUCCESS]: deleteRatingTagSuccess,
  [Types.DELETE_RATING_TAG_FAILURE]: deleteRatingTagFailure,
  [Types.MULTI_UPDATE_RATING_TAGS_REQUEST]: multiUpdateRatingTagsRequest,
  [Types.MULTI_UPDATE_RATING_TAGS_SUCCESS]: multiUpdateRatingTagsSuccess,
  [Types.MULTI_UPDATE_RATING_TAGS_FAILURE]: multiUpdateRatingTagsFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
