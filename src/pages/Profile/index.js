import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  TextField,
  MenuItem,
  LinearProgress,
} from '@material-ui/core';

import SaveButton from '../../components/SaveButton';
import InputPhone from '../../components/Inputs/InputPhone';
import { Container, Spacer } from './styles';

import User, { userStatus } from '../../models/User';
import Roles from '../../models/Roles';

import { updateUserRequest } from '../../store/ducks/user';

import phoneNumberValidator from '../../Utils/Validators/phoneNumber';
import emailValidator from '../../Utils/Validators/emailValidation';
import nameValidator from '../../Utils/Validators/nameValidator';

export default function Profile() {

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.user);

  const loading = useSelector(state => state.user.loading);
  const [user, setUser] = useState(User());

  /**
   * Fill User state when receive current user from Redux state
   */
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  function handleSave() {
    dispatch(updateUserRequest(user));
  }

  return (
    <Grid
      container
      spacing={4} >
      <Grid item lg={12} md={12} xl={12} xs={12}>
        <h1>Profile</h1>
        <Card>
          <Container disabled={loading}>
            <CardHeader title="Base Data" />
            <Divider />
            <CardContent>
              <TextField
                fullWidth
                disabled={currentUser.role === Roles.MANUFACTURER}
                label="Name"
                margin="dense"
                name="name"
                onChange={handleChange}
                variant="outlined"
                value={user.name}
                error={!nameValidator(user.name)}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                disabled={currentUser.role === Roles.MANUFACTURER}
                label="E-mail"
                margin="dense"
                name="email"
                onChange={handleChange}
                variant="outlined"
                value={user.email}
                error={!emailValidator(user.email)}
                InputLabelProps={{ shrink: true }}
              />
              {currentUser.role === Roles.ADMIN &&
                <>
                  <TextField
                    fullWidth
                    select
                    label="Role"
                    margin="dense"
                    name="role"
                    onChange={handleChange}
                    variant="outlined"
                    value={user.role}
                    InputLabelProps={{ shrink: true }}
                  >{Object.keys(Roles).map(key => (
                    <MenuItem key={key} value={Roles[key]}>
                      {Roles[key]}
                    </MenuItem>
                  ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    margin="dense"
                    name="status"
                    onChange={handleChange}
                    variant="outlined"
                    value={user.status}
                    InputLabelProps={{ shrink: true }}
                  >{Object.keys(userStatus).map(key => (
                    <MenuItem key={key} value={userStatus[key]}>
                      {userStatus[key]}
                    </MenuItem>
                  ))}
                  </TextField>
                </>
              }
            </CardContent>
            {user.role !== Roles.MANUFACTURER &&
              <>
                <Divider />
                <CardActions>
                  <SaveButton
                    onClick={handleSave}
                    loading={loading}
                    disabled={loading}
                    buttonText="Update" />
                </CardActions>
              </>
            }
          </Container>
        </Card>
      </Grid>
    </Grid>
  );
}
