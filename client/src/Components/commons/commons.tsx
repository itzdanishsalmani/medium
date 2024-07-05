export interface Blog {
    id: string;
    title: string;
    content: string;
    created_at:Date;
    author: {
        name: string;
      };
  }

  export interface Blogs {
    title: string;
    content: string;
    id: string;
  }
  
export const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
