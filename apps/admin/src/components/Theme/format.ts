export const formatFormData = (formData: any) => {
  return {
    ...formData,
    menu: formData.menu?.map((menuItem: any) => {
      return {
        title: menuItem?.title,
        page_id: menuItem?.page_id,
      };
    }),
    pages: formData.pages?.map((page: any) => {
      return {
        page_id: page?.page_id,
      };
    }),
  };
};
