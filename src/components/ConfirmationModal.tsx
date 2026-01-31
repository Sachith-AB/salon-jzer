import { IoAlertCircle } from "react-icons/io5";
import Title from "./Title";
import Button from "./Button";

interface ConfirmationModalProp {
    onConfirm?: () => void
    onCancel?: () => void
}

export default function ConfirmationModal({ onConfirm, onCancel }: ConfirmationModalProp) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-[32px] p-8 flex flex-col items-center w-[300px]">
                <IoAlertCircle size={64} color="#E74C3C"/>
                <Title text="Are you sure" color="primary" size="txl" weight={500}/>
                <Title text="Are you sure want to delete" color="primary" size="base" weight={400}/>
                <div className="flex gap-4 mt-6">
                    <Button text="Cancel" variant="accent" onClick={onCancel}/>
                    <Button text="Delete" variant="danger" onClick={onConfirm}/>
                </div>
            </div>
        </div>
    )
}
