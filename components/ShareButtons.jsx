import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    EmailIcon
} from 'react-share'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const ShareButtons = ({ property }) => {

    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`

    return (
        <>
            <h3 className="text-base sm:text-xl font-bold text-center pt-2">Partager cette propriété :</h3>
            <div className="flex gap-3 justify-center pb-5">
                <FacebookShareButton
                    url={shareUrl}
                    quote={property.name}
                    hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}
                >
                    <FacebookIcon size={40} round={true} />
                </FacebookShareButton>

                <TwitterShareButton
                    url={shareUrl}
                    title={property.name}
                    hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
                >
                    <TwitterIcon size={40} round={true} />
                </TwitterShareButton>

                <WhatsappShareButton
                    url={shareUrl}
                    title={property.name}
                    separator=":: "
                >
                    <WhatsappIcon size={40} round={true} />
                </WhatsappShareButton>

                <EmailShareButton
                    url={shareUrl}
                    subject={property.name}
                    body="Consultez cette annonce immobilière: "
                >
                    <EmailIcon size={40} round={true} />
                </EmailShareButton>
            </div>
        </>
    )
}
export default ShareButtons
