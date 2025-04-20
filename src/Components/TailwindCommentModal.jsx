import React, { useState } from "react";
import { GoPin } from "react-icons/go";

const TailwindCommentModal = ({ title, comment, onCommentChange, isPinned, actionLabel = 'Continuer', cancelLabel = 'Annuler', color = 'red-600', actionFunction, cancelAction }) => {

    return (<div className="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        {/* <!--
          Background backdrop, show/hide based on modal state.
      
          Entering: "ease-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-[100] w-screen overflow-y-auto">
            <div className="flex min-h-full min-w-min items-end justify-center p-4 text-center sm:items-center sm:p-0">
                {/* <!--
              Modal panel, show/hide based on modal state.
      
              Entering: "ease-out duration-300"
                From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                To: "opacity-100 translate-y-0 sm:scale-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100 translate-y-0 sm:scale-100"
                To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            --> */}
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-opacity-10 bg-${color} sm:mx-0 sm:size-10`}>
                                <GoPin className={`text-lg text-${color}`} />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h3 className="text-base font-semibold text-gray-900" id="modal-title">{title}</h3>
                                {!isPinned && (<div className="mt-2">
                                    <textarea className="bg-lightShapes rounded-lg outline-none p-2 resize-none w-full" placeholder="Commentaire..." value={comment} onChange={(event) => onCommentChange(event.target.value)} />
                                </div>)}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button type="button" className={`inline-flex w-full justify-center rounded-md bg-${color} bg-opacity-90 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-100 sm:ml-3 sm:w-auto`} onClick={() => actionFunction()}>{actionLabel}</button>
                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => cancelAction()}>{cancelLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default TailwindCommentModal;