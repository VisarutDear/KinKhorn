import { Card } from '@material-ui/core';
import { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import { produce } from 'immer';
import axios from 'axios';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from '@material-ui/core/Typography';
import {UserContext} from '../Context/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import StoreIcon from '@material-ui/icons/Store';
import { FilterDramaTwoTone } from '@material-ui/icons';
import * as apicall from '../api/apicall';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import AddBoxIcon from '@material-ui/icons/AddBox';
// import NumberFormat from 'react-number-format';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
interface menuType {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  img : string;
}

interface FormValues {
  shop: string;
  ownerId: string;
  area: string;
  status: string;
  fileupload : string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  
  button: {
    margin: theme.spacing(1,0,2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    width: '100%',
    marginTop: theme.spacing(1),
    margin: theme.spacing(0,0,2),
    
  },
  formControl2: {
    width: '100%',
    marginTop: theme.spacing(1),
    margin: theme.spacing(0,0,1),
    
  },
  formControl3: {
    width: '50%',
    marginTop: theme.spacing(1),
    margin: theme.spacing(0,0,1),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
// interface files {
//   files : string;
// }

export default function CreateStorePage() {
  const userContext = useContext(UserContext).user;
  const [file, setFile] = useState("");
  const [menuImg, setMenuImg] = useState([] as any);
  const [area, setArea] = useState("");
  const classes = useStyles();
  const { register, handleSubmit } = useForm<FormValues>();
  
  // const handleChange = (event1) => {
  //   setArea(event1.target.value);
  // };
  const [menuFields, setmenuField] = useState<menuType[]>([
    {
      id: '',
      name: '',
      price: 0,
      description: '',
      category: '',
      img : '',
    },
  ]);


  const onSubmit = (data : FormValues) => {
    // const formData = new FormData();
    // menuImg.forEach((file : any) => formData.append('files[]',file));
    // formData.append("image",file);
    // formData.append("shop",data.shop);
    // formData.append("ownerId",data.ownerId);
    // formData.append("area",data.area);
    // formData.append("menu",JSON.stringify(menuFields));
    // // const finalData = {...data, menu : menuFields};
    // axios.post('http://13.229.160.22:9000/api/shops/upload',formData).then((res) => console.log('res :',res)).catch((err) => console.log('err : ',err));
    // alert(JSON.stringify(formData));

    const store: apicall.ICreateStoreRequest = {
      ...data,
      file: file,
      menuImage: menuImg,
      menuFiled : menuFields
    }

    apicall.createStore(store)
      .then(res => console.log('res : ',res))
      .catch(err => console.log('err : ',err))
  };

  const handleUpload = (event : any) => {
    setFile(event.target.files[0]);
  }
  const handleAddFields = () => {
    setmenuField([
      ...menuFields,
      {
        id: '',
        name: '',
        price: 0,
        description: '',
        category: '',
        img : '',
      },
    ]);
  };

  const imgChangeHandler = (e : any) => {
    const files = [...menuImg];
    files.push(...e.target.files);
    setMenuImg(files)
  }

  const handleRemoveFields = (index: number) => {
    console.log('pop :', index);
    const values = [...menuFields];

    values.splice(index, 1);
    setmenuField(values);
  };

  // console.log('menu : ', menuFields);
  return (
    <Container component="main"  >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <StoreIcon  />
        </Avatar>
      <Typography component="h1" variant="h5">Create Store</Typography>
      {/* <Card style={{ display: 'flex', flexFlow: 'column' }}> */}
        {/* <Row> */}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate >
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="shop"
              label="Shop Name"
              autoComplete="shop"
              autoFocus
              {...register('shop', { required: 'error message' })}
              // placeholder="Shop Name"
            />
            {/* {errors.firstname && <div className="error">Enter your name</div>} */}
          </div>

          <div>
          <FormControl variant="outlined" className={classes.formControl} >
          <InputLabel >Select Area *</InputLabel>
          {/* <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel> */}
          <Select
          // margin="normal"
          // variant="outlined"
          required
          fullWidth
          id="area"
          label="Select Area *"
          autoComplete="area"
          autoFocus
          {...register('area')}>


            <MenuItem  value="A">Canteen A</MenuItem >
            <MenuItem  value="B">Canteen B</MenuItem >
            <MenuItem  value="C">Canteen C</MenuItem >
            </Select>
          </FormControl>
          </div>
          <div>
            <Typography >
            <Box fontWeight="fontWeightBold">
              Upload Shop Image :
              </Box>
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                >
                <Box display="flex" p={1} flexGrow={1}>
                
                <input
                  onChange={handleUpload} type='file'
                />
                </Box>
              </Button>
            {/* <input onChange={handleUpload} type='file'/> */}
          </div>
          <form>
            {menuFields.map((menu, index) => (
              <>
                <Typography> 
                  <Box fontWeight="fontWeightBold">
                  Menu {index + 1}
                  </Box>
                  </Typography>
                
                <div key={menu.id}>
                  <FormControl variant="outlined" className={classes.formControl2} >
                  {/* <InputLabel >Select Area *</InputLabel> */}
                    
                    
                    <input
                      onChange={(e) => {
                      const name = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].name = name;
                        })
                      );
                    }}
                    value={menu.name}
                    
                    placeholder="Insert Menu Name"
                    // {/* {...register('menu')}} */}
    
                  />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl3} >
                  <input
                    
                    onChange={(e) => {
                      const price = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].price = +price;
                        })
                      );
                    }}
                    value={menu.price}
                    placeholder="Insert Price"
                    
                  />
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl3} >
                  {/* <InputLabel >Select Area *</InputLabel> */}
                  {/* <Select
                  // required
                  // fullWidth
                  
                  > */}
                  <input
                    onChange={(e) => {
                      const category = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].category = category;
                        })
                      );
                    }}
                    value={menu.category}
                    placeholder="Label Food Category"

                  />

                      {/* <option  value="A">Canteen A</option  >
                      <option  value="B">Canteen B</option >
                      <option   value="C">Canteen C</option  >
                  </Select> */}
                  </FormControl>
                  <FormControl variant="outlined" className={classes.formControl} >
                  {/* <textarea aria-label="FDAS"> */}
                  <input
                    onChange={(e) => {
                      const description = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].description = description;
                        })
                      );
                    }}
                    value={menu.description}
                    placeholder="Food Description"
                  />
                  {/* </textarea> */}
                  </FormControl>
                  

                  <div> 
                    
                  <Typography >
                  <Box fontWeight="fontWeightBold">
                  Upload Food Image :
                    </Box>
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                      >
                      <Box display="flex" p={1} flexGrow={1}>
                    
                    <input type='file' value={menu.img} onChange={(e) => {
                      const img = e.target.value;
                      setmenuField((currentMenu) =>
                        produce(currentMenu, (v) => {
                          v[index].img = img;
                          
                        })
                      );
                    }} />
                      </Box>
                    </Button>
                    
                    </div>

                  <IconButton
                    disabled={menuFields.length === 1}
                    onClick={() => handleRemoveFields(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAddFields}>
                    <AddIcon />
                  </IconButton>

                  <div className={classes.formControl}>
                  <Divider  variant="fullWidth"  />
                  </div>
                </div>
              </>
            ))}
          </form>
          <Button
                fullWidth
                variant="contained"
                color="default"
                className={classes.button}
                // startIcon={<CloudUploadIcon />}
                >
          <input type="submit" />
          </Button>
        </form>
        {/* </Row> */}
      {/* </Card> */}
      <Card>
      </Card>
      <div id="upload-box">
      {/* <input type="file" onChange={handleUpload} /> */}
      {/* <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p> */}
    </div>
    </div>
      {/* <pre>{JSON.stringify(menuFields, null, 2)}</pre> */}
    </Container>
  );
}

