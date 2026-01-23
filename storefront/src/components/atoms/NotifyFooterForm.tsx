import React from 'react';
import { SendHorizonal } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

type NotifyForm = { email: string };

export const NotifyFooterForm = () => {
    const { t } = useTranslation('common');
    const { register, handleSubmit } = useForm<NotifyForm>();
    const onSubmit: SubmitHandler<NotifyForm> = data => window.alert(`${t('footer.notify.alert')} ${data.email}`);

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center w-full bg-black/20 backdrop-blur-sm border border-awadh-gold/30 rounded-lg p-2 shadow-lg hover:border-awadh-gold/50 transition-colors group"
        >
            <input
                {...register('email', {
                    required: true,
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: '',
                    },
                })}
                type="text"
                placeholder={t('footer.notify.placeholder')}
                className="flex-1 bg-transparent text-awadh-ivory placeholder-awadh-ivory/40 min-w-0 px-4 py-2 outline-none border-b border-awadh-gold/30 group-hover:border-awadh-gold/60 focus:border-awadh-gold transition-colors font-sans tracking-wide"
            />
            <button 
                type="submit" 
                className="ml-3 bg-awadh-gold text-awadh-maroon p-2.5 rounded hover:bg-white hover:text-awadh-maroon transition-all shadow-md active:scale-95"
                title={t('footer.notify.submit') || "Subscribe"}
            >
                <SendHorizonal size={20} />
            </button>
        </form>
    );
};
