import { Sort } from "../dtos/general-query.dtos";

export const sortFunction = (sort : Sort = Sort.CreatedAt) => {
        let sortObject : any = {};

        if (sort === Sort.Title) {
            sortObject = {title: 1} ;
        } else if (sort === Sort.UpdatedAt) {
            sortObject = {updatedAt : -1 };
        } else {
            sortObject = {createdAt : -1 };
        }

        return sortObject;
    };