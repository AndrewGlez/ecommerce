import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context as ProductContext } from '../../Context/ProductContext';
import { ProductContextState } from '../../Types/Product';
import { Context as UserContext } from '../../Context/UserContext';
import { User, UserContextState } from '../../Types/User';

const fadeIn = keyframes`
    0% { opacity: 0%},
    100% { opacity: 100%}
`
const Container = styled.div`
    width: 500px;
    padding-block: 10px;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.2);
    background-color: ${(props) => props.theme.body};
    animation: ${fadeIn} 1s;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding-inline: 20px;
    padding-block: 10px;
`
const InputWrapper = styled.div`
    width: 100%;
    margin: 5px;
    text-align: center;
`
const CCWrapper = styled.div`
    width: 100%;
    margin-inline: 5px;
    text-align: center;
    display: flex;
    justify-content: left;
`
const Label = styled.div`
    font-weight: bold;
    margin: 10px;
    width: fit-content;
`
const Input = styled.input`
    width: 95%;
    padding: 5px;
    padding-inline: 8px;
    margin-bottom: 15px;
    color: ${(props) => props.theme.text};
    outline: 1px solid ${(props) => props.theme.border};
    border: none;
    background: transparent;
`
const PlaceOrder = styled.button`
    border: none;
    background: #047d40;
    padding: 15px;
    font-size: 20px;
    color: white;
    cursor: pointer;
    &:hover{
        box-shadow: inset 0 0 10px 10px rgba(0,0,0,0.3);
    }
`
const CheckoutForm: React.FC<User> = ({
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    password,
}) => {
    const { products, removeAllProductsFromCart } = useContext(ProductContext) as ProductContextState;
    const { currentUser } = useContext(UserContext) as UserContextState;

    const [inputEmail, setInputEmail] = useState<string>(currentUser.email);
    const [inputAddress, setInputAddress] = useState<string>(currentUser.address);
    const [inputPhoneNumber, setInputPhoneNumber] = useState<string>(currentUser.phoneNumber);
    const [inputFirstName, setInputFirstName] = useState<string>(currentUser.firstName);
    const [inputLastName, setInputLastName] = useState<string>(currentUser.lastName);

    const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputEmail(e.currentTarget.value);
    };
    const handleAddressChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputAddress(e.currentTarget.value);
    };
    const handlePhoneNumberChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputPhoneNumber(e.currentTarget.value);
    };
    const handleFirstNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputFirstName(e.currentTarget.value);
    };
    const handleLastNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputLastName(e.currentTarget.value);
    };

    type CreateReceiptResponse = {
        userId: number,
        items: number[];
    }

    async function createReceipt() {
        let amountOfItems = 0;
        for (let i = 0; i < products.length; i++) {
            amountOfItems += products[i].amount;
        }
        try {
            const { data } = await axios.post<CreateReceiptResponse>(
                "htpps://localhost:3000/receipts/create",
                {
                    userId: userId,
                    items: products,
                    //amountOfItems: amountOfItems;
                }
            );
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("Error message: ", error.message);

                return error.message;
            } else {
                console.log("Unexpected error: ", error);
                return "An enexpected error ocurred";
            }
        }
    }

    const navigate = useNavigate();
    const navigateToSuccess = () => {
        createReceipt();
        navigate('/success');
        removeAllProductsFromCart();
    };

    return (
        <Container>
            <Form>
                <InputWrapper>
                    <Label>Correo Electrónico</Label>
                    <Input onChange={handleEmailChange} required
                        type='email' value={inputEmail}></Input>
                </InputWrapper>
                <InputWrapper>
                    <Label>Dirección de Entrega</Label>
                    <Input onChange={handleAddressChange} value={inputAddress}></Input>
                </InputWrapper>
                <InputWrapper>
                    <Label>Número de Teléfono</Label>
                    <Input onChange={handlePhoneNumberChange} type='tel' value={inputPhoneNumber}></Input>
                </InputWrapper>
                <InputWrapper>
                    <Label>Nombre</Label>
                    <Input onChange={handleFirstNameChange} value={inputFirstName}></Input>
                </InputWrapper>
                <InputWrapper>
                    <Label>Apellido</Label>
                    <Input onChange={handleLastNameChange} value={inputLastName} />
                </InputWrapper>
                <InputWrapper>
                    <Label>Número de Tarjeta</Label>
                    <Input maxLength={16} required placeholder='****************'></Input>
                </InputWrapper>
                <CCWrapper>
                    <InputWrapper>
                        <Label>Expiración</Label>
                        <Input type='text' required placeholder='mm/yyyy' />
                    </InputWrapper>
                    <InputWrapper>
                        <Label>CVV</Label>
                        <Input maxLength={3} required placeholder='***' />
                    </InputWrapper>
                </CCWrapper>
                <PlaceOrder onClick={navigateToSuccess}>¡Realizar Compra!</PlaceOrder>
            </Form>
        </Container>
    )
}

export default CheckoutForm;
