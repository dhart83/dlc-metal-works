import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { async, uuidv4 } from '@firebase/util'

import FirebaseStorageService from '../firebase/FirebaseStorageService'

const ImageUploadPreview = ({
    multiUpload,
    basePath,
    didSubmit,
    setDidSubmit,
    setUrlCallback
}) => {
    const [downloadUrls, setDownloadUrls] = useState([])
    const [uploadProgress, setUploadProgress] = useState([])
    const fileInputRef = useRef()

    useEffect(() => {
        setDidSubmit(false)
        setDownloadUrls([])
        fileInputRef.current.value = null
    }, [didSubmit])

    useEffect(() => {
        setUrlCallback(downloadUrls)
    }, [downloadUrls])

    useEffect(() => {
        // console.log(uploadProgress)
    }, [uploadProgress])

    const handleCancelImageClick = (downloadUrl) => {
        const index = downloadUrls.indexOf(downloadUrl)
        FirebaseStorageService.deleteFile(downloadUrls[index])
        setDownloadUrls(
            downloadUrls.slice(0, index).concat(downloadUrls.slice(index + 1))
        )

        fileInputRef.current.value = null
        setUploadProgress(-1)
        // setDownloadUrls([])
    }

    const handleFileChanged = (e) => {
        const files = Array.from(e.target.files)

        files.forEach((file) => {
            if (!file) {
                alert('File select failed. Please try again')
                return
            }
        })

        files.forEach(async (file) => {
            const generatedFileId = uuidv4()
            const path = `${basePath}/${generatedFileId}`

            try {
                const downloadUrl = await FirebaseStorageService.uploadFile(
                    file,
                    path,
                    setUploadProgress
                )
                setDownloadUrls((downloadUrls) => [
                    ...downloadUrls,
                    downloadUrl
                ])
            } catch (error) {
                setUploadProgress(-1)
                fileInputRef.current.value = null
                alert(error.message)
                throw error
            }
        })
    }

    return (
        <Styled_Image_Upload_Preview>
            {/* Render the image from newly uploaded file url */}
            {downloadUrls.map((downloadUrl, key) => {
                return downloadUrl ? (
                    <div className='image-wrapper' key={key}>
                        <img src={downloadUrl} alt={downloadUrl} />
                        <button
                            className='btn-delete'
                            type='button'
                            onClick={() => handleCancelImageClick(downloadUrl)}
                        >
                            X
                        </button>
                    </div>
                ) : null
            })}

            {/* Render progress bar while file is uploading */}
            {/* {downloadUrls.map((downloadUrl) => {
                return !downloadUrl && uploadProgress > -1 ? (
                    <div>
                        <label htmlFor='file'>Upload Progress:</label>
                        <progress id='file' value={uploadProgress} max='100'>
                            {uploadProgress}%
                        </progress>
                        <span>{uploadProgress}%</span>
                    </div>
                ) : null
            })} */}

            {/* Render single or multiple file input */}
            {multiUpload ? (
                <input
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={handleFileChanged}
                    ref={fileInputRef}
                    hidden={downloadUrls.length > 0}
                    // hidden={uploadProgress > -1 || downloadUrls.length > 0}
                />
            ) : (
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChanged}
                    ref={fileInputRef}
                    hidden={downloadUrls.length > 0}
                    // hidden={uploadProgress > -1 || downloadUrls.length > 0}
                />
            )}
        </Styled_Image_Upload_Preview>
    )
}

const Styled_Image_Upload_Preview = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    .image-wrapper {
        position: relative;
    }
    .btn-delete {
        background-color: red;
        width: 20px;
        height: 20px;
        padding: 0;
        margin: 0;
        position: absolute;
        right: 0;
        top: 1rem;
    }

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        margin: 1rem 0;
        border: 1px solid #777;
    }
`

export default ImageUploadPreview
