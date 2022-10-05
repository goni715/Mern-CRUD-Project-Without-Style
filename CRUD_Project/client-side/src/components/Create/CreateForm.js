import React, {Fragment, useRef} from 'react';
import {ErrorToast, isEmpty, SuccessToast} from "../../Helper/ValidationHelper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Create} from "../../APIServices/CRUDServices";
import FullScreenLoader from "../Common/FullScreenLoader";
import {useNavigate} from "react-router-dom";




const CreateForm = () => {

    let ProductName,ProductCode,Img,UnitPrice,Quantity,TotalPrice,Loader=useRef();

    const navigate = useNavigate();
    const SaveData = () => {

        let Product_Name = ProductName.value;
        let Product_Code = ProductCode.value;
        let Product_Img = Img.value;
        let Unit_Price = UnitPrice.value;
        let Product_Quantity = Quantity.value;
        let Total_Price = TotalPrice.value;




        if(isEmpty(Product_Name)){
              ErrorToast("Product Name Required");
         }
         else if(isEmpty(Product_Code)){
             ErrorToast("Product Code Required");
         }
         else if(isEmpty(Product_Img)){
             ErrorToast("Product Image Required");
         }
         else if(isEmpty(Unit_Price)){
             ErrorToast("Product Unit Price Required");
         }
         else if(isEmpty(Product_Quantity)){
             ErrorToast("Product Quantity Required");
         }
         else if(isEmpty(Total_Price)){
             ErrorToast("Product Total Price Required");
         }
         else{

             Loader.classList.remove("d-none");

             Create(Product_Name,Product_Code,Product_Img,Unit_Price,Product_Quantity,Total_Price)
                 .then((result)=>{

                     if(result == true){
                         Loader.classList.add("d-none");
                         SuccessToast("Data Insert Success");

                         //RedirectToReadPage

                         navigate("/", {
                             replace: true
                         });


                     }else{
                         ErrorToast("Data insert Failled");
                     }
                 })


         }



    }


    return (

        <Fragment>
           <div className="container">
               <div className="row">
                   <div className="col-md-4 p-2">
                       <label>Product Name</label>
                       <input ref={(input)=>ProductName=input} type="text" className="form-control"/>
                   </div>
                   <div className="col-md-4 p-2">
                       <label>Product Code</label>
                       <input ref={(input)=>ProductCode=input} type="text" className="form-control"/>
                   </div>
                   <div className="col-md-4 p-2">
                       <label>Image</label>
                       <input ref={(input)=>Img=input} type="text" className="form-control"/>
                   </div>
                   <div className="col-md-4 p-2">
                       <label>Unit Price</label>
                       <input ref={(input)=>UnitPrice=input} type="text" className="form-control"/>
                   </div>
                   <div className="col-md-4 p-2">
                       <label>Quantity</label>
                       <input ref={(input)=>Quantity=input} type="text" className="form-control"/>
                   </div>
                   <div className="col-md-4 p-2">
                       <label>Total Price</label>
                       <input ref={(input)=>TotalPrice=input} type="text" className="form-control"/>
                   </div>
               </div>
               <div className="row">
                  <div className="col-md-4 p-2">
                      <button onClick={SaveData} className="btn btn-primary w-100">Save</button>
                      <ToastContainer/>
                  </div>
               </div>
           </div>
            <div className="d-none" ref={(div)=>Loader=div}>
                <FullScreenLoader/>
            </div>
        </Fragment>
    );
};

export default CreateForm;