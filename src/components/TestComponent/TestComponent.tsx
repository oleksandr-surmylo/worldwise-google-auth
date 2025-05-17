import {
    getRedirectGoogleResult,
    signWithGooglePopup,
    signWithGoogleRedirect
} from "../../utils/firebase/firebase.utils.ts";
import { useEffect } from "react";

const TestComponent = () => {

    useEffect ( () => {
        ( async function () {
            const response = await getRedirectGoogleResult ()
            console.log ( response )
        } ) ()
    }, [] );


    const logGoogleRedirectUser = async () => {
        await signWithGoogleRedirect ();
    }

    const logGooglePopupUser = async () => {
        const { user } = await signWithGooglePopup ();
        console.log ( { user } )
    }


    return (
        <div className='flex flex-col items-center justify-center text-black text gap-5 mt-5'>
            <button onClick={ logGoogleRedirectUser } className='cursor-pointer border'>sign With Redirect</button>
            <button onClick={ logGooglePopupUser } className='cursor-pointer border'>sign With Popup</button>
        </div>
    );
};

export default TestComponent;