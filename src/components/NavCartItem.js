"use client";

import NavItem from "./NavItem"

export default function NavCartItem(){
// let data=JSON.parse(localStorage?.getItem('cart')||'[]')
let data=[]
return (<NavItem label={'Cart'+(data.length>0?" ("+data.length+")":"" )} url='/cart'/>)
}