import { apiSlice } from './apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    loginUser: build.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: build.mutation({
      query: (body) => ({
        url: '/users/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getUserProfile: build.query({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useGetUserProfileQuery,
} = userApiSlice;
