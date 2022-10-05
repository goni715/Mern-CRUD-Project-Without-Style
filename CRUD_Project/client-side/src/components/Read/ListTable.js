import React, {Fragment, useEffect, useState} from 'react';
import {Delete, Read} from "../../APIServices/CRUDServices";
import FullScreenLoader from "../Common/FullScreenLoader";
import {ErrorToast, SuccessToast} from "../../Helper/ValidationHelper";
import {ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";


const ListTable = () => {

    let [DataList,SetDataList]=useState([]);

    useEffect(()=>{

        Read().then((result)=>{
            SetDataList(result);
        })

    },[]);



   /* Delete data*/
    const DeleteItem = (id) => {

      Delete(id).then((result)=>{
           if(result===true){
                 SuccessToast("Delete Success");

                 Read().then((result)=>{
                    SetDataList(result);
                  })

           }
           else{
              ErrorToast("Request Fail Try Again");
           }
      })
    }


    /* Update data*/
    const navigate = useNavigate();
    const UpdateItem = (id) => {

         navigate("/update/"+id);
    }





    if(DataList.length>0){
        return (
            <Fragment>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Code</th>
                        <th>Image</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        DataList.map((item,i)=>{

                            return(
                                <tr>
                                    <td>{item.ProductName}</td>
                                    <td>{item.ProductCode}</td>
                                    <td><img className="list-img" src={item.Img} /> </td>
                                    <td>{item.UnitPrice}</td>
                                    <td>{item.Quantity}</td>
                                    <td>{item.TotalPrice}</td>
                                    <td>
                                        <button onClick={DeleteItem.bind(this,item._id)} className="btn btn-danger mx-1">Delete</button>
                                        <button onClick={UpdateItem.bind(this,item._id)} className="btn btn-primary mx-1">Update</button>
                                        <ToastContainer/>
                                    </td>
                                </tr>
                            )

                        })
                    }
                    </tbody>
                </table>
            </Fragment>
        );
    }
    else{
        return(
            <Fragment>
                <FullScreenLoader></FullScreenLoader>
            </Fragment>
        );
    }



};

export default ListTable;