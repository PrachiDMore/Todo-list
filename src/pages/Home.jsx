import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Layout from '../components/Layout'
import List from '../components/List';
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase_config';
import { MdModeEdit } from 'react-icons/md'

const Home = () => {

	const [todo, setTodo] = useState("");
	const [update, setUpdate] = useState({ update: false, ID: "" });
	const addTodo = async () => {
		if (todo.length === 0) {
			alert("First enter the Todo...")
		} else {
			await addDoc(collection(db, "Todo"), {
				note: todo
			});
			setTodo("")
			alert("Todo added...")
		}
	}

	const updateTodo = async () => {
		if (todo.length === 0) {
			alert("First enter the Todo...")
		} else {
			await updateDoc(doc(db, "Todo", update.ID), {
				note: todo
			});
			setTodo("")
			setUpdate({ update: false, ID: "" })
			alert("Todo updated...")
		}
	}

	const [todos, setTodos] = useState([])
	useEffect(() => {
		const q = query(collection(db, "Todo"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const notes = [];
			querySnapshot.forEach((doc) => {
				notes.push({ ...doc.data(), todoId: doc.id });
			});
			setTodos(notes)
		});
		return () => {
			unsubscribe()
		}
	}, [])

	const deleteTodo = async (Id) => {
		let confirm = window.confirm("Do you really want to delete todo?")
		if (confirm) {
			await deleteDoc(doc(db, "Todo", Id));
			alert("Todo deleted...")
		}

	}

	return (
		<>
			<Layout>
				<h1 className='text-4xl Nunito font-bold pb-5 text-white'>Todo's List</h1>
				<div className='w-7/12 h-3/4 p-6 bg-white rounded-lg'>

					<div className='flex justify-center pb-14'>
						<input id='todo' onChange={(e) => { setTodo(e.target.value) }} value={todo} className='bg-gray-200 rounded-lg outline-none w-[88%] px-6 py-2 pr-12 text-lg' type="text" placeholder='What is your next Todo?' />
						{update.update ? <span onClick={updateTodo} className='relative'><MdModeEdit className='text-[#3F72AF] text-lg absolute top-3 right-5 cursor-pointer' /></span> : <span onClick={addTodo} className='relative'><FaPlus className='text-[#3F72AF] text-lg absolute top-3 right-5 cursor-pointer' /></span>}
					</div>

					<div className='grid grid-cols-1 gap-4 justify-items-center overflow-auto max-h-[48vh] h-max'>
						{
							todos.map((data, index) => {
								return <List key={index} item={data} deleteTodo={deleteTodo} setUpdate={setUpdate} setTodo={setTodo} />
							})
						}
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Home
