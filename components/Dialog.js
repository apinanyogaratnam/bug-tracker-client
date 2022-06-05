export default function Dialog({isOpened = false, closeDialog}) {
    return (
        <div>
            { isOpened && (
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                }}>
                    <dialog
                        style={{
                            zIndex: '1',
                        }} open={isOpened}>
                        <form>
                            <label>
                                Name:
                                <input type="text" />
                            </label>
                            <label>
                                Description:
                                <input type="text" />
                            </label>
                            <button>Submit</button>
                        </form>
                        <button onClick={closeDialog}>Close</button>
                    </dialog>
                </div>
            )}
        </div>
    );
}