import {Button, Modal} from "react-bootstrap"; 
import { useState, useEffect } from "react";
import './Inventory.css';


//Modal function
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function Inventory() {

  //Simples useStates.
  const [modalShow, setModalShow] = useState(false);
  const [forms, setForms] = useState([
    {
      title: "",
      description: "",
      url: ""
    }
  ])
  const [form, setForm] = useState({
       title: "",
      description: "",
   })

   //Cada vez que refresaca los datos en JSON son pasado a serForms.
  useEffect(()=> {
     fetch("http://localhost:3001/")
     .then((res) => res.json())
     .then((jsonRes) => setForms(jsonRes));
  }, [])

  //Al pulsar el boton se activa esta funcion. Que coge el name y el alt de la imagen seleccionada y acto seguido. El titulo y la description del form se actualizan. Y ensena el moda
  const handleClick = (e) =>{
    setModalShow(true)
    const {name, alt} = e.target;

    setForm({
        title: name ,
        description: alt,
    });
  }

  return (
    //Primero ordena los forms y luego los muestra individualmente. Al pulsar la imagen el modal aparece. Y envia los props a la funcion.
    <div className="Inventory">
      
      <h4>Varia Inventory</h4>
      <div className="Block">
        {
          forms.sort((a, b)=>{
            var titleA = a.title;
            var titleB = b.title;
            if(titleA < titleB){
              return -1
            }
            if (titleA > titleB) {
              return 1
            }
          }).map(form => {
            return(
              <div>
                <h2>{form.title}</h2>
                <img key={form.title} src={form.url} alt={form.description} name={form.title} onClick={handleClick} width={400}></img>
              </div>
            )
          })
        }
       </div>
       <MyVerticallyCenteredModal
         show={modalShow}
         onHide={() => setModalShow(false)}
         title= {form.title}
         description={form.description}
       />
    </div>

  );
}

export default Inventory;
