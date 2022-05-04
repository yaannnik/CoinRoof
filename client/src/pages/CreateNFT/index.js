import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CancelOutlinedIcon  from "@material-ui/icons/CancelOutlined";
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useStyles } from "./styles.js";

import DropZone from "../../components/DropZone";
import StickyFooter from "../../components/StickyFooter/index.js";

import { api } from "../../services/api";

const CreateNFT = () => {
  const classes = useStyles();
  const history = useHistory();

  const account = useSelector((state) => state.allNft.account);
  const baseContract = useSelector(
    (state) => state.allNft.baseContract
  );

  const [selectedFile, setSelectedFile] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  function handleInputChange(event) {
    let { name, value } = event.target;
    // if(name === 'image'){
    //   value = event.target.files[0];
    // }
    setFormData({ ...formData, [name]: value });
  }

  async function createNFT(event) {
    event.preventDefault();
    const { title, description, price } = formData;
    var price_ = String(parseInt(price))
    if(Number.isNaN(parseInt(price))) {
      price_ = "1"
    }
    alert(price_)

    console.log("title: " + title);

    const data = new FormData();
    data.append("name", title);
    data.append("description", description);
    data.append("price", price_);

    if(selectedFile){
      data.append('img', selectedFile);
      console.log("slectedFile: ", selectedFile);
    }

    try {
      const totalSupply = await baseContract.methods.totalSupply().call();
      data.append("tokenId", Number(totalSupply) + 1);

      const response = await api.post("/tokens", data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      });
      console.log(response);

      mint(response.data.message);
    } catch (error) {
      console.log(error);
      // error.response.data
      history.push('/');
      history.go(0);
    }
  }

  async function mint(tokenMetadataURL) {
    try {
      const receipt = await baseContract.methods
        .mint(tokenMetadataURL)
        .send({ gas: 1000000, from: account });
      console.log(receipt);
      console.log(receipt.events.Transfer.returnValues.tokenId);
      // setItems(items => [...items, {
      //   tokenId: receipt.events.Transfer.returnValues.tokenId,
      //   creator: accounts[0],
      //   owner: accounts[0],
      //   uri: tokenMetadataURL,
      //   isForSale: false,
      //   saleId: null,
      //   price: 0,
      //   isSold: null
      // }]);
      history.push('/');
      history.go(0);
    } catch (error) {
      console.error("Error, minting: ", error);
      // alert("Error while minting!");
      history.push('/');
      history.go(0);
    }
  }

  return (
    <div className={classes.pageCreateNft}>
      <form onSubmit={createNFT}>
        <div className={classes.formHeader}>
          <h1 > Pick your image </h1>
          <Link to="/">
            <CancelOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <div className={classes.content}>
          <div className={classes.dropzone}>
            <DropZone onFileUploaded={setSelectedFile} />
          </div>
          <fieldset>
            <TextField
              label="Title"
              name="title"
              id="outlined-required"
              variant="outlined"
              required
              defaultValue="Put your title here"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              multiline
              rows={4}
              label="Description"
              name="description"
              variant="outlined"
              required
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Price (Wei)"
              name="price"
              variant="outlined"
              value={formData.price}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: <InputAdornment position="start"> Default 1 Wei: </InputAdornment>,
              }}
              fullWidth
            />

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </fieldset>
        </div>
      </form>

      <section >
        <StickyFooter/>
      </section>
    </div>
  );
};

export default CreateNFT;
