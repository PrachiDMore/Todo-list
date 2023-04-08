import React from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { MdModeEdit } from 'react-icons/md'

const List = ({ item, deleteTodo, setUpdate, setTodo}) => {
  return (
    <>
      <div className='w-[88%] h-max px-6 py-2 pr-24 text-lg bg-gray-200 rounded-lg relative'>
        {item?.note}
        
        <MdModeEdit onClick={() => {setTodo(item.note); setUpdate({update:true, ID:item.todoId})}} className='absolute right-14 top-3 text-xl text-[#3F72AF] cursor-pointer' />
        <RiDeleteBin5Fill onClick={() => {deleteTodo(item.todoId)}} className='absolute right-5 top-3 text-xl text-[#3F72AF] cursor-pointer' />

      </div>
    </>
  )
}

export default List