"use client";
import { authClient } from "@/app/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

import toast from "react-hot-toast";

const Deletebtn = ({item}) => {
  const router = useRouter()

    const delHandler= async()=>{
      
            const {data:token} = await authClient.token();
            console.log(token)
            

        const res = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/allhome/${item?._id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                  authorization : `Bearer ${token.token}`
            },
            body: JSON.stringify()
        })
        const data = await res.json()
        console.log(data)
        toast.success("Delete successfully !")
  router.refresh()



    }
    return (
        <div>
                <AlertDialog>
      <Button variant="danger">Delete!</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete HouseRent permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome House</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button className="bg-amber-300 font-bold" slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={delHandler} slot="close" variant="danger">
                Delete House
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>

        </div>
    );
};

export default Deletebtn;