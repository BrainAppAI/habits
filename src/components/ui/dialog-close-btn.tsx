import Icons from '@/assets/icons'
import { Button } from './button'

const DialogCloseButton = ({ onClose }: { onClose: () => void }) => {
    return (
        <>
            <Button
                onClick={onClose}
                variant="tertiary"
                size="sm"
                className="dark:hidden absolute top-4 right-4"
            >
                <span>
                    <Icons.Close size={18} />
                </span>
            </Button>
            <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="dark:block hidden absolute top-4 right-4"
            >
                <span>
                    <Icons.Close size={18} />
                </span>
            </Button>
        </>
    )
}

export default DialogCloseButton
