'use client'
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaTextWidth } from 'react-icons/fa';
import { TbListDetails } from 'react-icons/tb';
import { MdTextFields, MdOutlineTextsms } from 'react-icons/md';
import { BsTextareaResize, BsCalendarDate } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';

function FormDesigner() {
  const [lang, setLang] = useState('english');
  const [inputs, setInputs] = useState([]);
  const [showDelete, setShowDelete] = useState(null);
  const [radioDelete, showRadioDelete] = useState(null);
  const [chosenId, setId] = useState(null)
  const [formName, setName] = useState('')
  const [formM, showFormM] = useState(false)
  const [user, setUser] = useState(false)
  const [warning, setWarning] = useState(false)
  const [formDesc, setDesc] = useState('')
  const [discM, showDiscM] = useState(false)
  const [addElements, setAddElements] = useState(false)
  const [hover, setHover] = useState(null)

  const dir = {
    direction: 'rtl',
    textAlign: 'right',
  };
  const arabicChar = /^[\u0600-\u06FF0-9\s]*$/

  function addText(kind, size) {
    const element = {
      id: `element_${new Date().getTime()}`,
      kind: kind,
      size: size,
      value: ''
    };
    setInputs((prev) => [...prev, element]);
  }
  function addTextInput(type, size) {
    const element = {
      id: `element_${new Date().getTime()}`,
      type: type,
      size: size,
      name: '',
      value: '',
      required: false
    };
    setInputs((prev) => [...prev, element]);
  }
  function addDateInput(type) {
    const element = {
      id: `element_${new Date().getTime()}`,
      type: type,
      name: '',
      value: '',
      required: false
    };
    setInputs((prev) => [...prev, element]);
  }
  function addOptions(type) {
    const element = {
      id: `element_${new Date().getTime()}8`,
      type: type,
      value: 'empty',
      options: [
        {
          id: `element_${new Date().getTime()}9`,
          name: '',
          value: '',
          required: false
        },
        {
          id: `element_${new Date().getTime()}`,
          name: '',
          value: '',
          required: false
        },
      ],
      name: '',
      required: false
    };
    setInputs((prev) => [...prev, element]);
  }
  function addRadio(id) {
    const element = {
      id: `element_${new Date().getTime()}`,
      name: '',
      value: '',
      required: false
    }
    const updatedStates = inputs.map((e) => {
      if (e.id === id && e.type === 'group') {
        e.options.push(element);
        e.options.map(ele => {
          ele.name = e.name
        })
      }
      return e;
    });
    setInputs(updatedStates)
  }
  function changeInputName(event, id) {
    const newStates = inputs.map(item => {
      if (item.id === id) {
        item.name = event.target.value.replace(/ /g, '_')
      }
      if (item.type === 'group') {
        item.options.map(ele => {
          ele.name = event.target.value.replace(/ /g, '_')
        })
      }
      return item
    })
    setInputs(newStates)
  }
  function changeInputValue(event, id) {
    const newStates = inputs.map(item => {
      if ((item.id === id) && (item.type !== 'group')) {
        item.value = event.target.value
      }
      return item
    })
    setInputs(newStates)
  }
  function changeRadioValue(event, id, eleId) {
    const newStates = inputs.map(item => {
      if (item.id === id) {
        item.options.map(ele => {
          if (ele.id === eleId) {
            ele.value = event.target.value
          }
        })
      }
      return item
    })
    setInputs(newStates)
  }
  function changeSelectedRadio(id, eleId) {
    const newStates = inputs.map(item => {
      if (item.id === id) {
        item.options.map(ele => {
          if (ele.id === eleId) {
            item.value = ele.value
          }
        })
      }
      return item
    })
    setInputs(newStates)
  }
  function deleteInput(id) {
    const newState = inputs.filter((e) => {
      return e.id !== id
    })
    setInputs(newState)
  }
  function deleteRadio(id, eleId) {
    console.log(id, eleId)
    const newState = [...inputs];
    const parentElement = newState.find((item) => item.id === id);
    if (parentElement) {
      parentElement.options = parentElement.options.filter(
        (option) => option.id !== eleId
      )
    }
    setInputs(newState);
  }
  function confirmDesign() {
    if (formName && formDesc && inputs.length) {
      setUser(true)
    } else {
      setWarning(true)
    }
  }

  return (
    <main style={lang === 'arabic' ? dir : {}} className=" bg-slate-100 w-full select-none items-start p-6 min-w-[770px]">
      <div className=" pb-6 border-b border-gray-400 flex items-center justify-between ">
        <div className=" ">
          {lang === 'english' &&
            <p className=" w-full text-3xl text-gray-600">{user ? 'FILL THE FORM' : 'FORM DESIGNER'}</p>
          }
          {lang === 'arabic' &&
            <p className=" w-full text-3xl text-gray-600">{user ? 'إملاء الإستمارة' : 'تصميم الإستمارة'}</p>
          }
        </div>
        <div className="  text-gray-600 font-bold flex gap-4 border border-gray-600 p-4 pt-3 rounded-md ">
          <p
            onClick={() => { if (lang === 'english') setLang('arabic'); setInputs([]); setName(''); setDesc('') }}
            className={` ${lang === 'arabic' ? 'bg-white shadow-md shadow-white' : ''} hover:bg-white hover:shadow-md hover:shadow-white duration-300 rounded-lg cursor-pointer p-1 w-24 text-center `}
          >
            عربى
          </p>
          <p
            onClick={() => { if (lang === 'arabic') setLang('english'); setInputs([]); setName(''); setDesc('') }}
            className={` ${lang === 'english' ? 'bg-white  shadow-md shadow-white' : ''} hover:bg-white hover:shadow-md hover:shadow-white duration-300 rounded-lg cursor-pointer p-1 w-24 text-center  `}
          >
            English
          </p>
        </div>
      </div>
      <div className="flex flex-wrap w-full items-start justify-start pl-4 pt-4 ">
        {(formM && !user) &&
          <div className=" z-10 absolute flex justify-center items-center top-0 left-0 w-full h-screen bg-black bg-opacity-50 ">
            <div className=" flex-wrap absolute flex border-2 border-gray-600 p-4 bg-white rounded-lg w-72 ">
              <input
                value={formName}
                onChange={(event) => {
                  if (lang === 'arabic') {
                    if (arabicChar.test(event.target.value)) setName(event.target.value)
                  } else {
                    setName(event.target.value)
                  }
                }}
                className="w-full h-12 p-2 text-gray-600 font-bold outline-gray-300"
                placeholder={lang === 'arabic' ? 'أضف إسم الإستمارة' : "Add form name"}
                type="text">
              </input>
              <div className=" mt-8  w-full gap-12 flex items-center justify-center">
                <button
                  onClick={() => showFormM(false)}
                  className="w-24 rounded border border-gray-600 p-2 text-center font-semibold text-gray-600 duration-300 hover:bg-gray-600 hover:text-white "
                >
                  {lang === 'arabic' ? 'تأكيد' : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        }
        {(discM && !user) &&
          <div className="  z-10 absolute flex justify-center items-center top-0 left-0 w-full h-screen bg-black bg-opacity-50 ">
            <div className=" flex-wrap absolute flex border-2 border-gray-600 p-4 bg-white rounded-lg w-72 ">
              <input value={formDesc}
                onChange={(event) => {
                  if (lang === 'arabic') {
                    if (arabicChar.test(event.target.value)) setDesc(event.target.value)
                  } else {
                    setDesc(event.target.value)
                  }
                }}
                className="w-full h-12 p-2 text-gray-400 font-bold outline-gray-300"
                placeholder={lang === 'arabic' ? 'أضف وصف الإستمارة' : "Add form Description"} type="text">
              </input>
              <div className=" mt-8  w-full gap-12 flex items-center justify-center">
                <button
                  onClick={() => showDiscM(false)}
                  className="w-24 rounded border border-gray-600 p-2 text-center font-semibold text-gray-600 duration-300 hover:bg-gray-600 hover:text-white "
                >
                  {lang === 'arabic' ? 'تأكيد' : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        }
        <div className=" min-h-[305px] border-b mb-6 border-gray-400  w-full ">
          <div className=" w-full p-4 pb-0 ">
            <div className=" w-fit ">
              <div
                onClick={() => { if (!user) showFormM(true) }}
                className=" cursor-pointer w-full text-4xl font-semibold text-gray-400"
              >
                {formName || (lang === 'arabic' ? 'أضف إسم الإستمارة' : "Add Form Name")}
              </div>
              <div className="  relative mt-1 h-0.5 w-full bg-gray-400  ">
                <span className=" absolute -right-1 -top-0.5  h-1.5 w-1.5 rounded-full bg-gray-400 "></span>
                <span className=" absolute -left-1 -top-0.5  h-1.5 w-1.5 rounded-full bg-gray-400 "></span>
              </div>
            </div>
            <div
              onClick={() => { if (!user) showDiscM(true) }}
              className=" cursor-pointer mt-4 w-full text-lg font-semibold text-gray-400"
            >{formDesc || (lang === 'arabic' ? 'أضف وصف الإستمارة' : 'Add Form Description')}</div>
          </div>
          <div className={` ${user ? ' caret-transparent ' : ''} flex flex-wrap w-full `}>
            {
              inputs.length ?
                <form className="relative  grid h-full w-full grid-cols-6 gap-x-6 p-2 pb-16">
                  {inputs.map((e, i) => (
                    <div
                      id={e.id}
                      onClick={() => setId(e.id)}
                      onMouseEnter={() => { setShowDelete(i); setId(e.id) }}
                      onMouseLeave={() => setShowDelete(null)}
                      className={` 
                    ${(e.type === "text" && e.size === "small") || e.type === 'date' || e.type === 'time'
                          ? " col-span-1 "
                          : " col-span-2 "
                        }
                    ${e.kind === "title" ? " col-span-6 " : ""}
                    ${e.kind === "title" && e.size === 'small' ? " mt-0 " : "mt-3"}
                    relative hover:bg-purple-100 duration-300 p-1 rounded-md w-full `}
                      key={i}
                    >
                      {(showDelete === i && !user) && (
                        <RiDeleteBin5Line
                          onClick={() => deleteInput(e.id)}
                          className={` ${lang === 'arabic' ? ' left-0 ' : ' right-0'} absolute top-1 cursor-pointer text-red-400 `}
                        />
                      )}
                      {e.kind === "title" && (
                        <input
                          disabled={user}
                          value={e.value}
                          placeholder={lang === 'arabic' ? 'إضافة نص' : "Add text"}
                          className={`  ${e.kind === "title" && e.size === "small"
                            ? " text-base "
                            : "text-2xl"
                            }
                        min-w-[70px]  bg-transparent text-2xl text-gray-400 outline-none`}
                          onChange={(event) => {
                            event.target.style.width = `${event.target.value.length * 17
                              }px `;
                            if (lang === 'arabic') {
                              if (arabicChar.test(event.target.value)) changeInputValue(event, e.id)
                            } else {
                              changeInputValue(event, e.id)
                            }
                          }}
                        ></input>
                      )}
                      {e.type === "text" && (
                        <>
                          <input
                            disabled={user}
                            value={e.name}
                            onChange={(event) => {
                              if (lang === 'arabic') {
                                if (arabicChar.test(event.target.value)) changeInputName(event, e.id)
                              } else {
                                changeInputName(event, e.id)
                              }
                            }}
                            placeholder={lang === 'arabic' ? 'أضف إسم العنصر' : "Add label"}
                            className=" ml-1 w-full min-w-[30px] rounded-md bg-transparent pr-4 text-gray-400  outline-none"
                          ></input>
                          <input
                            name={e.name}
                            value={e.value}
                            type={e.type}
                            onChange={(event) => changeInputValue(event, e.id)}
                            className="mt-1  caret-gray-400  h-10 w-full rounded-md border-2 border-gray-400  outline-none"
                          ></input>
                        </>
                      )}
                      {(e.type === "date" || e.type === "time") && (
                        <>
                          <input
                            disabled={user}
                            value={e.name}
                            onChange={(event) => {
                              if (lang === 'arabic') {
                                if (arabicChar.test(event.target.value)) changeInputName(event, e.id)
                              } else {
                                changeInputName(event, e.id)
                              }
                            }}
                            placeholder={lang === 'arabic' ? 'أضف إسم العنصر' : "Add label"}
                            className=" ml-1 w-full min-w-[30px] rounded-md bg-transparent pr-4 text-gray-400  outline-none"
                          ></input>
                          <label>
                            <input
                              name={e.name}
                              onChange={(event) => changeInputValue(event, e.id)}
                              value={e.value}
                              type={e.type}
                              className="mt-1 h-10 w-full rounded-md border-2 border-gray-400  outline-none"
                            ></input>
                          </label>
                        </>
                      )}
                      {e.type === 'group' && (
                        <>
                          <input
                            disabled={user}
                            value={e.name}
                            onChange={(event) => {
                              if (lang === 'arabic') {
                                if (arabicChar.test(event.target.value)) changeInputName(event, e.id)
                              } else {
                                changeInputName(event, e.id)
                              }
                            }
                            }
                            placeholder={lang === 'arabic' ? 'أضف إسم المجموعة' : "Add group label"}
                            className=" ml-1 mb-2 w-full min-w-[30px] rounded-md bg-transparent pr-4 text-[#a4a0bc]  outline-none"
                          ></input>
                          {e.options.map((ele, i) => (
                            <label
                              onMouseEnter={() => showRadioDelete(ele.id)}
                              onMouseLeave={() => showRadioDelete(null)}
                              key={i}
                              className=" flex items-center justify-between text-gray-400"
                            >
                              {(radioDelete === ele.id && !user) && (
                                <RiDeleteBin5Line
                                  onClick={() => deleteRadio(e.id, ele.id)}
                                  className=' false ? " right-0 top-1 cursor-pointer text-red-400 '
                                />
                              )}
                              <input
                                disabled={user}
                                value={ele.value}
                                onChange={(event) => {
                                  if (lang === 'arabic') {
                                    if (arabicChar.test(event.target.value)) changeRadioValue(event, e.id, ele.id)
                                  } else {
                                    changeRadioValue(event, e.id, ele.id)
                                  }
                                }}
                                placeholder={lang === 'arabic' ? 'أضف إسم الأختيار' : "Add option label"}
                                className="  ml-1 w-full min-w-[30px] rounded-md bg-transparent pr-4 text-[#5c596c] outline-none"
                              ></input>
                              <input
                                onChange={() => changeSelectedRadio(e.id, ele.id)}
                                type={"radio"}
                                checked={e.value === ele.value}
                                className=""
                              ></input>
                            </label>
                          ))}
                          {!user && <p className=" text-gray-500 m-auto w-fit text-sm font-bold text hover:text-gray-600 duration-100 mt-2 cursor-pointer" onClick={() => { addRadio(chosenId) }}>{lang === 'arabic' ? 'إضافة إختيار' : "Add Option"}</p>}
                        </>
                      )}
                    </div>
                  ))}
                </form>
                :
                <p className='w-full h-44 font-semibold text-gray-300 text-2xl flex items-center justify-center'>{lang === 'arabic' ? 'لا يوجد عناصر فى الاستمارة' : 'No Elements Added To Form'}</p>
            }
          </div>
        </div>
        <div className=" flex justify-between items-center w-full ">
          {lang === 'english' &&
            <div
              onClick={() => {
                if (user) {
                  setUser(false)
                } else {
                  confirmDesign()
                }
              }}
              className=" relative w-48 cursor-pointer rounded-lg border-2 border-gray-600 p-4 text-center font-semibold text-gray-600 duration-300 hover:bg-gray-600 hover:text-white ">
              {user ? 'BACK TO DESIGNER' : 'CONFIRM DESIGN'}
              <span className=" left-0 absolute -bottom-4 h-1 w-full border-b border-gray-600"></span>
            </div>
          }
          {lang === 'arabic' &&
            <div
              onClick={() => {
                if (user) {
                  setUser(false)
                } else {
                  confirmDesign()
                }
              }}
              className=" relative w-44 cursor-pointer rounded-lg border-2 border-gray-600 p-4 text-center font-semibold text-gray-600 duration-300 hover:bg-gray-600 hover:text-white ">
              {user ? ' رجوع إلى التصميم' : 'تأكيد التصميم'}
              <span className=" h-1 left-0 absolute -bottom-4 w-full border-b border-gray-600"></span>
            </div>
          }
          {!user &&
            <div className={` ${lang === 'arabic' ? 'left-11' : 'right-11'} relative w-56 rounded-full h-56 flex items-center justify-center `}>
              <div
                onMouseLeave={() => setAddElements(false)}
                className={` 
                            ${hover !== null ? ' bg-gray-400' : ' bg-gray-600'} ${addElements ? ' opacity-100 w-[220px] h-[220px] ' : ' opacity-0 w-20 h-20 '} 
                            duration-300 flex items-center justify-center  rounded-full `}>
                <div className={` ${addElements ? ' h-[194px] w-[194px] ' : '  w-20 h-20 '}
                              duration-300  bg-[#c1c9cf] rounded-full` }>
                  <div
                    onMouseEnter={() => setHover(lang === 'arabic' ? 'نص كبير' : "Large Text")}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => addText("title", "large")}
                    className={` ${hover === 'Large Text' || hover === 'نص كبير' ? " border-b-gray-400 " : "border-b-[#f1effd] "} 
                                  ${addElements ? ' border-x-[47.5px] w-[90.5px] h-[85px] border-b-[100px] ' : '  border-x-[0px] w-[0px] h-[0px] border-b-[0px] '}
                                  duration-300 cursor-pointer rounded-b-[30px] box-border origin-top border-t-0 absolute bg-transparent top-1/2  left-1/2 -translate-x-1/2 border-transparent `}>
                    <FaTextWidth
                      className={` ${hover === 'Large Text' || hover === 'نص كبير' ? ' text-white text-3xl' : "text-[#8ea6bb] text-2xl"} 
                                    ${addElements ? ' top-16 ' : '  top-0 '}
                                    duration-300 absolute  left-1/2 -translate-x-1/2 `}
                    />
                  </div>
                  <div
                    onMouseEnter={() => setHover(lang === 'arabic' ? 'نص صغير' : "Small Text")}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => addText("title", "small")}
                    className={` ${hover === 'Small Text' || hover === 'نص صغير' ? " border-b-gray-400 " : "border-b-[#f1effd] "} 
                                  ${addElements ? 'border-x-[47.5px] w-[90.5px] h-[85px] border-b-[100px] ' : '  border-x-[0px] w-[0px] h-[0px] border-b-[0px] '}
                                  duration-300 cursor-pointer rotate-[51.5deg]  rounded-b-[30px]  box-border origin-top border-t-0 absolute bg-transparent top-1/2  left-1/2 -translate-x-1/2 border-transparent `}>
                    <MdTextFields
                      className={` ${hover === 'Small Text' || hover === 'نص صغير' ? ' text-white text-3xl' : "text-[#8ea6bb] text-2xl"} 
                                    ${addElements ? '  top-16 ' : '  top-0 '}
                                    duration-300 absolute  left-1/2 -translate-x-1/2 `}
                    />
                  </div>
                  <div
                    onMouseEnter={() => setHover(lang === 'arabic' ? 'حقل كبير' : "Large Text Field")}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => addTextInput("text", "large")}
                    className={` ${hover === 'Large Text Field' || hover === 'حقل كبير' ? " border-b-gray-400 " : "border-b-[#f1effd] "} 
                                  ${addElements ? ' border-x-[47.5px] w-[90.5px] h-[85px] border-b-[100px] ' : '  border-x-[0px] w-[0px] h-[0px] border-b-[0px] '}
                                  duration-300 cursor-pointer rotate-[103deg]  rounded-b-[30px]  box-border origin-top border-t-0 absolute bg-transparent top-1/2  left-1/2 -translate-x-1/2 border-transparent `}>
                    <BsTextareaResize
                      className={` ${hover === 'Large Text Field' || hover === 'حقل كبير' ? ' text-white text-3xl' : "text-[#8ea6bb] text-2xl"} 
                                    ${addElements ? '  top-16 ' : '  top-0 '}
                                    duration-300 absolute  left-1/2 -translate-x-1/2 `}
                    />
                  </div>
                  <div
                    onMouseEnter={() => setHover(lang === 'arabic' ? 'حقل صغير' : "Small Text Field")}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => addTextInput("text", "small")}
                    className={` ${hover === 'Small Text Field' || hover === 'حقل صغير' ? " border-b-gray-400 " : "border-b-[#f1effd] "} 
                                  ${addElements ? ' border-x-[47.5px] w-[90.5px] h-[85px] border-b-[100px] ' : '  border-x-[0px] w-[0px] h-[0px] border-b-[0px] '}
                                  duration-300 cursor-pointer rotate-[154.5deg] rounded-b-[30px]  box-border origin-top border-t-0 absolute bg-transparent top-1/2  left-1/2 -translate-x-1/2 border-transparent `}>
                    <MdOutlineTextsms
                      className={` ${hover === 'Small Text Field' || hover === 'حقل صغير' ? ' text-white text-3xl' : "text-[#8ea6bb] text-2xl"} 
                                    ${addElements ? '  top-16 ' : '  top-0 '}
                                    duration-300 absolute  left-1/2 -translate-x-1/2 `}
                    />
                  </div>
                  <div
                    onMouseEnter={() => setHover(lang === 'arabic' ? 'تاريخ' : "Date")}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => addDateInput("date")}
                    className={` ${hover === 'Date' || hover === 'تاريخ' ? " border-b-gray-400 " : "border-b-[#f1effd] "} 
                                  ${addElements ? ' border-x-[47.5px] w-[90.5px] h-[85px] border-b-[100px] ' : '  border-x-[0px] w-[0px] h-[0px] border-b-[0px] '}
                                  duration-300 cursor-pointer rotate-[206deg] rounded-b-[30px]  box-border origin-top border-t-0 absolute bg-transparent top-1/2  left-1/2 -translate-x-1/2 border-transparent `}>
                    <BsCalendarDate
                      className={` ${hover === 'Date' || hover === 'تاريخ' ? ' text-white text-3xl' : "text-[#8ea6bb] text-2xl"} 
                                    ${addElements ? '  top-16 ' : '  top-0 '}
                                    duration-300 absolute  left-1/2 -translate-x-1/2 `}
                    />
                  </div>
                  <div
                    onMouseEnter={() => setHover(lang === 'arabic' ? 'وقت' : "Time")}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => addDateInput("time")}
                    className={` ${hover === 'Time' || hover === 'وقت' ? " border-b-gray-400 " : "border-b-[#f1effd] "} 
                                  ${addElements ? 'border-x-[47.5px] w-[90.5px] h-[85px] border-b-[100px] ' : '  border-x-[0px] w-[0px] h-[0px] border-b-[0px] '}
                                  duration-300 cursor-pointer rotate-[257.5deg] rounded-b-[30px]  box-border origin-top border-t-0 absolute bg-transparent top-1/2  left-1/2 -translate-x-1/2 border-transparent `}>
                    <BiTime
                      className={` ${hover === 'Time' || hover === 'وقت' ? ' text-white text-3xl' : "text-[#8ea6bb] text-2xl"} 
                                    ${addElements ? ' top-16 ' : '  top-0 '}
                                    duration-300 absolute  left-1/2 -translate-x-1/2 `}
                    />
                  </div>
                  <div
                    onMouseEnter={() => setHover(lang === 'arabic' ? 'مجموعة إختيارات' : 'Options Group')}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => addOptions("group")}
                    className={` ${hover === 'Options Group' || hover === 'مجموعة إختيارات' ? " border-b-gray-400 " : "border-b-[#f1effd] "} 
                                  ${addElements ? ' border-x-[47.5px] w-[90.5px] h-[85px] border-b-[100px] ' : '  border-x-[0px] w-[0px] h-[0px] border-b-[0px] '}
                                  duration-300 cursor-pointer rotate-[309deg] rounded-b-[30px]  box-border origin-top border-t-0 absolute bg-transparent top-1/2  left-1/2 -translate-x-1/2 border-transparent `}>
                    <TbListDetails
                      className={` ${hover === 'Options Group' || hover === 'مجموعة إختيارات' ? ' text-white text-3xl' : "text-[#8ea6bb] text-2xl"} 
                                    ${addElements ? '  top-16 ' : '  top-0 '}
                                    duration-300 absolute  left-1/2 -translate-x-1/2 `}
                    />
                  </div>
                </div>
              </div>
              <div
                onMouseEnter={() => setAddElements(true)}
                className={` 
                        ${hover ? ' text-white bg-gray-600 ' : ' text-gray-600 bg-[#e7ecf1]'}
                        ${addElements ? ' w-24 h-24 ' : ' w-[82px] h-[82px]  '}
                        cursor-pointer flex items-center duration-300 justify-center text-center text-xs font-bold border-4 border-gray-600 absolute rounded-full `}>
                {lang !== 'arabic' && <p>{hover ? hover : 'Add ELEMENTS'}</p>}
                {lang === 'arabic' && <p>{hover ? hover : 'إضافة عناصر'}</p>}
              </div>
            </div>
          }
        </div>
      </div>
      {warning &&
        <div className=" z-10 absolute flex justify-center items-center top-0 left-0 w-full h-screen bg-black bg-opacity-50 ">
          <div className=" flex-wrap absolute flex border-2 border-gray-600 p-4 bg-white rounded-lg w-96 ">
            <div className=' font-semibold text-gray-500 text-center flex items-center justify-center w-full '>
              <p className=' w-fit'>
                {lang === 'arabic'
                  ?
                  'تأكد من إضافة إسم ، وصف  ، وعنصر واحد على الأقل'
                  :
                  'Add Name , Description and At least one Element'
                }
              </p>
            </div>
            <div className=" mt-8  w-full gap-12 flex items-center justify-center">
              <button
                onClick={() => setWarning(false)}
                className="w-24 rounded border border-gray-600 p-2 text-center font-semibold text-gray-600 duration-300 hover:bg-gray-600 hover:text-white "
              >
                {lang === 'arabic' ? 'تأكيد' : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      }
    </main>
  );
}

export default FormDesigner;
