import React from 'react'
import InfoBox from "@/components/InfoBox";

const InfoBoxes = () => {
    return (
        <section>
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <InfoBox
                        heading='Pour les locataires'
                        backgroundColor="bg-gray-100"
                        buttonInfo={{
                            text: 'Parcourir les propriétés',
                            link: '/properties',
                            backgroundColor: 'bg-black'
                        }}>
                        Trouvez la location de vos rêves. Ajouter les propriétés et les contacts de vos propriétaires préférés dans vos favoris.
                    </InfoBox>

                    <InfoBox
                        heading='Pour les propriétaires'
                        backgroundColor="bg-indigo-100"
                        buttonInfo={{
                            text: 'Ajouter une propriété',
                            link: '/properties/add',
                            backgroundColor: 'bg-indigo-500'
                        }}>
                        Listez vos propriétés et trouvez des locataires potentiels. Louer en airbnb ou longue durée.
                    </InfoBox>
                </div>
            </div>
        </section>
    )
}
export default InfoBoxes
