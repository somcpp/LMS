import React from 'react'
import { useCreateCheckoutSessionMutation } from '@/api/purchaseApi'
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const BuyCourseButton = ({courseId}) => {
  const [createCheckoutSession, {data,isLoading,isSuccess,error,isError}] =useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    try {
      const response = await createCheckoutSession(courseId).unwrap();

      window.location.href = response.url;
    } catch (error) {
      if(isError) {
        toast.error(error?.data?.message)
      }
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  )
}

export default BuyCourseButton