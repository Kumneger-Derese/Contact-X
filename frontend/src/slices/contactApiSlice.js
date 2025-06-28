import { apiSlice } from './apiSlice';

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query({
      query: (pageNumber,) => ({
        url: `/contacts/getContacts/?page=${pageNumber}`,
        method: 'GET',
      }),
      providesTags: ['Contact'],
    }),

    getContact: build.query({
      query: (id) => `/contacts/getContact/${id}`,
      providesTags: ['Contact'],
    }),

    createContact: build.mutation({
      query: (body) => ({
        url: `/contacts/createContact`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contact'],
    }),

    searchContact: build.mutation({
      query: (body) => ({
        url: `/contacts/searchContact`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Contact'],
    }),

    updateContact: build.mutation({
      query: ({ id, body }) => ({
        url: `/contacts/updateContact/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Contact'],
    }),

    deleteContact: build.mutation({
      query: ({ id, publicId }) => ({
        url: `/contacts/deleteContact/${id}`,
        method: 'DELETE',
        body: { publicId },
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
  useSearchContactMutation,
} = contactApiSlice;
