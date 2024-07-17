import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCashOut = () => {
    const axiosPublic = useAxiosPublic();
    const { data: cashOut = [], isPending: loading, refetch } = useQuery({
        queryKey: ["cashOut"],
        queryFn: async () => {
            const res = await axiosPublic.get("/cash-out");
            return res.data;
        },
    });

    return [cashOut, loading, refetch]
};


export default useCashOut;