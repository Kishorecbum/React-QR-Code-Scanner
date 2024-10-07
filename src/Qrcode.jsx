import { useState } from "react"


const Qrcode = () => {
  const [img,setImg]=  useState("");
  const [loading,setLoading]=useState(false);
  const [qrdata,setqrdata]=useState("");
  const[qrsize,setqrsize]=useState("");
  
     async function generateQR(){
      setLoading(true);
      try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
        setImg(url)
      }catch(error){
     console.error("Error generating QR code",error);
     
      }finally{
        setLoading(false);
      }
    }
    function downloadQR(){
      fetch(img)
      .then((response)=>response.blob())
      .then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch((error)=>{
        console.error("Error downloading QR code",error);
        
      })
    }
   

  return (
    <div className='app-container'>
        <h1>QR CODE GENERATOR</h1>
        {loading && <p>Please wait...</p>}
      {img && <img src={img} alt="" className="qr-code-image" />}
        <div>
            <label htmlFor="dataInput" className="input-label">
                Data for QR code:
            </label>
            <input type="text" id="dataInput" placeholder="Enter data for QRcode" value={qrdata} onChange={(e)=>setqrdata(e.target.value)}/>

            <label htmlFor="sizeInput" className="input-label" >
               Image size(e.g., 150):
            </label>
            <input type="text" id="sizeInput" placeholder="Enter image size" value={qrsize} onChange={(e)=>setqrsize(e.target.value)}/>
            <button className="generate-button" onClick={generateQR} disabled={loading}>Generate QR Code</button>
            <button className="download-button" onClick={downloadQR}>Download QR Code</button>
        </div>
        <p className="footer">Designed By <a href="">KISHORE</a></p>
    </div>
  )
}

export default Qrcode