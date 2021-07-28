import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addIpo, deleteIpo, editIpo } from '../../../redux/actions/ipoActions';
import CustomButton from '../../Elements/Button';

const Font = "'Josefin Sans', sans-serif";
const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        position: 'relative',
    },
    Title: {
        fontFamily: Font,
        margin:'15px 0 0 10px',
        fontSize: '25px',
        textAlign: 'left',
        color: '#3b4c58',
    },
    Container:{
        width:'90%',
        margin:'40px auto',
    },
    buttonStyle: {
        boxShadow: '0 2.6px 2.6px 0 rgba(0, 0, 0, 0.1)',
        backgroundColor: '#3b4c58',
        width:'50%',
        margin:' 10px auto'
      },
      buttonFont: {
        width: '100%',
        height: '23px',
        fontFamily: Font,
        fontSize: '15px',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        margin:'10px auto',
        cursor: 'pointer',
        opacity:1,
        '&:hover': {
        color:'#3b4c58',
        
        },
      },
      section: {
        border: '#000 1px solid',
        margin: '12px',
        padding: '5px',
        width: '100%'
      },
      paddingAdjust: {
        padding: '5px 10px !important'
      },
      itemsFlex: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0px 10px'
      },
      itemBlock: {
        backgroundColor: '#fffdd0',
        margin: '5px',
        padding: '3px 5px',
        fontSize: '16px'
      },
      itemDel: {
        color: 'red',
        marginLeft: '5px',
        cursor: "pointer"
      },

}));

function Form(props){
    const classes= useStyles();
    const [flag,setFlag]=useState(props.flag);
    const [isDisabled,setDisabled] = useState(flag==="0"?false:true);
    const [id,setId] = useState(props.ipo?props.ipo.id:'');
    const [name,setName] = useState(props.ipo?props.ipo.companyName:'');
    const [remarks,setRemarks] = useState(props.ipo?props.ipo.remarks:'');
    const [pricePerShare,setPrice] = useState(props.ipo?props.ipo.pricePerShare:0);
    const [shares,setShares] = useState(props.ipo?props.ipo.shares:0);
    const [openDateTime,setDateTime] = useState(props.ipo?props.ipo.openDateTime:'');
    const [stockExchangeName,setStockExchangeName]= useState(props.ipo?props.ipo.stockExchangeName:'');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleRemove=()=>{
        dispatch(deleteIpo(id));
        navigate('/admin/ipos');
    }
      const onSubmit=(e)=>{
          if(props.flag==0){
            e.preventDefault();
            let body = {
               companyName:name,
               stockExchangeName:stockExchangeName,
               pricePerShare:pricePerShare,
               shares:shares,
               openDateTime:openDateTime,
               remarks:remarks
            }
  
         dispatch(addIpo(body));
          }
          else if(props.flag==1){
            e.preventDefault();
            let body = {
                id:id,
                companyName:name,
               stockExchangeName:stockExchangeName,
               pricePerShare:pricePerShare,
               shares:shares,
               openDateTime:openDateTime,
               remarks:remarks
            }
           dispatch(editIpo(body));
          }
          setDisabled(true);
          setFlag(1);
      }

      const handleEdit=(e)=>{
      flag==0?setFlag("1"):setFlag("0");
          setDisabled(!isDisabled);
      }

    return(
        <div>
            <form style={{ width: '100%',marginTop:'60px' }}>
                <Grid container className={classes.paper} spacing={3}>
                    <Grid item xs={6}>
                        <TextField label="Company Name" value={name} disabled={isDisabled} variant="outlined" style={{ width: '100%' }} required onChange={(e)=>setName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Stock Exchange Name" value={stockExchangeName} disabled={isDisabled} variant="outlined" style={{ width: '100%' }} required onChange={(e)=>setStockExchangeName(e.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Price Per Share" value={pricePerShare} disabled={isDisabled} variant="outlined" style={{ width: '100%' }} required onChange={(e)=>setPrice(e.target.value)}/>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField label="Shares" value={shares} disabled={isDisabled} variant="outlined" style={{ width: '100%' }} required onChange={(e)=>setShares(e.target.value)}/>
                    </Grid>

                    <Grid item xs={6}>
                    <TextField
    id="datetime-local"
    label="Open Date Time"
    type="datetime-local"
    disabled={isDisabled}
    value={openDateTime}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
                   </Grid>

                    <Grid item xs={6}>
                        <TextField label="Remarks" value={remarks} multiline minRows={5} disabled={isDisabled} variant="outlined" style={{ width: '100%' }} onChange={(e)=>setRemarks(e.target.value)}/>
                    </Grid>
          <Grid item xs={6}>
              {flag=="1"?<CustomButton className={classes.buttonStyle} onClick={handleEdit}><Typography className={classes.buttonFont}>Edit</Typography></CustomButton>:<CustomButton className={classes.buttonStyle} onClick={onSubmit}><Typography className={classes.buttonFont}>Submit</Typography></CustomButton>}
              
          </Grid>
          <Grid item xs={6}>
          {flag=="1"?<CustomButton className={classes.buttonStyle} onClick={handleRemove} ><Typography className={classes.buttonFont}>Delete</Typography></CustomButton>:''}
          </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Form;
