import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCashIn = () => {
    const axiosPublic = useAxiosPublic();
    const { data: cashIn = [], isPending: loading, refetch } = useQuery({
        queryKey: ["cashIn"],
        queryFn: async () => {
            const res = await axiosPublic.get("/cash-in");
            return res.data;
        },
    });

    return [cashIn, loading, refetch]
};

export default useCashIn;