import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
export   const getArticle = () => {
  return useQuery(
    ['department',],
    () =>
    axios.get("http://localhost:3333/articles")
    .then(response=>response),
    {
      refetchOnWindowFocus: false,
    },
  );
};