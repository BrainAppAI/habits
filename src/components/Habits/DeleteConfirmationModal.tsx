import Icons from '@/assets/icons'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

interface DeleteConfirmationModalProps {
    title: string
    description?: string
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    showModal: boolean
    onDeleteConfirmed: () => void
    onDeleteDenied: () => void
    confirmedBtnLoading: boolean
}

const DeleteConfirmationModal = ({
    title,
    description,
    showModal,
    setShowModal,
    onDeleteConfirmed,
    onDeleteDenied,
    confirmedBtnLoading,
}: DeleteConfirmationModalProps) => {
    return (
        <Dialog onOpenChange={setShowModal} open={showModal}>
            <DialogContent className="sm:max-w-[360px]">
                <DialogHeader>
                    <div className="mb-3 text-red-500">
                        <Icons.Trash03 size={32} strokeWidth={1.5} />
                    </div>
                    <DialogTitle>{title}</DialogTitle>
                    {description ? (
                        <DialogDescription>{description}</DialogDescription>
                    ) : null}
                </DialogHeader>
                <DialogFooter>
                    <div className="w-full flex justify-between items-center">
                        <Button
                            variant="tertiary"
                            size="xs"
                            onClick={onDeleteDenied}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            size="xs"
                            onClick={onDeleteConfirmed}
                        >
                            {confirmedBtnLoading ? 'Loading' : 'Delete'}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteConfirmationModal
