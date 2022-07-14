import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';
import { chooseBrand, chooseName, chooseProof, choosePrice, chooseSize } from '../../redux/slices/rootSlice';
import { Input } from '../SharedComponents/Input/Input';
import { useGetData } from '../../custom-hooks/FetchData';


interface WhiskeyFormProps {
    id?:string;
    data?:{}
}

interface WhiskeyState {
    name: string;
    brand: string;
    size: string;
    proof: string;
    price: string;
}

export const WhiskeyForm = (props:WhiskeyFormProps) => {

    const dispatch = useDispatch();
    let { whiskeyData, getData } = useGetData();
    const store = useStore();
    const name = useSelector<WhiskeyState>(state => state.name);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            dispatch(chooseName(data.name));
            dispatch(chooseBrand(data.brand));
            dispatch(chooseSize(data.size));
            dispatch(chooseProof(data.proof));
            dispatch(choosePrice(data.price));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Whiskey Name</label>
                    <Input {...register('name')} name="name" placeholder='Name'/>
                </div>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <Input {...register('brand')} name="brand" placeholder='Brand'/>
                </div>
                <div>
                    <label htmlFor="size">Size</label>
                    <Input {...register('size')} name="size" placeholder='Size'/>
                </div>
                <div>
                    <label htmlFor="proof">Proof</label>
                    <Input {...register('proof')} name="proof" placeholder='Proof'/>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder='Price'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}