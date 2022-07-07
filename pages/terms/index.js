import { Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { DESKTOP } from "../../util/mediaQuery";
import { metaGen } from "../../util/seo";

export default function About() {
  const isPc = useMediaQuery(DESKTOP);
  const { t } = useTranslation("seo_service");

  return (
    <Stack
      sx={{
        pt: 5,
        px: isPc ? 5 : 3,
        minWidth: "100vw",
        alignItems: "center",
        bgcolor: "#eceff5",
      }}
    >
      <NextSeo
        {...metaGen({
          title: t("title"),
          description: t("description"),
          url: t("url"),
        })}
      />
      <Stack spacing={2} sx={{ pt: isPc && 4 }}>
        <Stack sx={{ maxWidth: 1024, px: isPc && 2, py: 4 }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Terms and Conditions
          </Typography>
          <Typography variant="body1">
            Welcome to Kamui File (from this point onwards "the Service.") The
            Service offers its users solely a web and mobile application which
            allows users to manipulate documents and/or images through online
            software. The current Terms and Conditions stipulate the legally
            binding conditions between Yourself (the "User") and the websites,
            services, and applications of Kamui File (from this point forward,
            Kamui File). Kamui File brands are property of Woony.
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            1. Use of Our Service
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            1.1 General
          </Typography>
          <Typography variant="body1">
            This page explains the terms by which you may use our online and/or
            mobile services, website, and software provided on or in connection
            with our services. By accessing or using Kamui File you agree to be
            conformant to this Terms and Conditions agreement ("Agreement")
            whether or not you are registered on our services. In the case of
            disagreement with all or part of these Terms and Conditions, you
            should abstain from using the Service. By means of acceptance of the
            current Terms and Conditions, the User agrees to comply with the
            following service rules:
          </Typography>
          <ul>
            <li>To have read and understood what is explained here.</li>
            <li>
              To have assumed all of the obligations that are stated here.
            </li>
            <li>
              To use the service solely for purposes permitted by law and which
              do not violate the rights of a third-party.
            </li>
            <li>
              To not use this website for any unlawful activity. You are
              prohibited to break any term and condition to not generate content
              dedicated to creating SPAM or which could provide instructions
              about how to engage in illegal activities.
            </li>
            <li>
              To not gather, handle, or store personal information about other
              Users or third-parties without complying with the current
              legislation regarding the protection of information.
            </li>
          </ul>
          <Typography variant="body1">
            If the regulations in the Terms and Conditions are in contradiction
            with the privacy policy, Terms and Conditions will prevail. Failure
            to comply with these obligations may result in the cancellation of
            the Contract, as is established in Clause 6.
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            1.2 Service Rules
          </Typography>
          <Typography variant="body1">
            Your use of the Service and Kamui File Desktop is subject to this
            Reasonable Use Policy, which has been created to ensure that our
            service is fair for both users and developers. The following is not
            permitted in connection with Kamui File Services and Desktop App:
          </Typography>
          <ul>
            <li>
              using any automated or non-automated scraping process (including
              bots, scrapers, and spiders) in conjunction with Kamui File
              Desktop;
            </li>
            <li>
              converting or otherwise editing documents with Kamui File Desktop
              at a rate that exceeds what a human can reasonably do by using
              manual means and a conventional device;
            </li>
            <li>
              abusing Kamui File Desktop in excess of what is reasonably needed
              or required for legitimate business or personal purposes.
            </li>
          </ul>
          <Typography variant="body1">
            If Kamui File determines that you are in breach of this policy, we
            may temporarily or permanently suspend or terminate your account or
            your subscription to the Service.
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            2. User Content
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            2.1 General
          </Typography>
          <Typography variant="body1">
            Kamui File does not analyse the content of files whilst processing
            them and only Users will have access to the edited files. No
            documents are stored on the server of Kamui Files, only the user's
            device resources are used to manipulate the documents. Users bear
            the sole responsibility for the usage of their own files.
          </Typography>

          <Typography variant="h6" sx={{ my: 1.5 }}>
            2.2 Content manipulation
          </Typography>
          <Typography variant="body1">
            Kamui File provides all the necessary information to assist the user
            in processing files, and only the User is responsible for contacting
            Kamui File in case of technical problems. Kamui File is highly
            concerned about file security.
          </Typography>

          <Typography variant="h6" sx={{ my: 1.5 }}>
            2.3 Responsibility for the content of the files
          </Typography>
          <Typography variant="body1">
            Kamui File does not analyze the content of processed files and thus
            is not responsible for its tools misuse nor copyright infringements
            which may affect third- parties. The User will be responsible before
            Kamui File of any penalty, sanction, and/or fine which the courts or
            other competent authorities could issue against Kamui File for
            noncompliance with any part of this Agreement. In particular, users
            agree to use the Service in conformity with current laws and
            conformant to the rules aforementioned in section 1.1.
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            3. No warranty
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            3.1 General
          </Typography>
          <Typography variant="body1">
            Use of the service is at your own risk. To the maximum extent
            permitted by applicable law, the service is provided without
            warranties of any kind. Kamui File does not warrant that the service
            will meet your requirements; that the service will be available at
            any particular time or location, uninterrupted or secure; that any
            defects or errors will be corrected; or that the service is free of
            viruses or other harmful components. Any content downloaded or
            otherwise obtained through the use of the service is downloaded at
            your own risk and you will be solely responsible for any damage to
            your computer system or mobile device or loss of data that results
            from such download or your use of the service. Kamui File does not
            warrant, endorse, guarantee, or assume responsibility for any
            product or service advertised or offered by a third party through
            the Kamui File service or any hyperlinked website or service, and
            Kamui File will not be a party to monitor any transaction between
            you and third-party providers.
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            4. No warranty
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            4.1 General
          </Typography>
          <Typography variant="body1">
            To the maximum extent permitted by applicable law, in no event shall
            Kamui File or its employees be liable for any direct, indirect,
            punitive, incidental, special, consequential or exemplary damages,
            including without limitation damages for use, data or other
            intangible losses, arising from or relating to any breach of this
            agreement. Under no circumstances will Kamui File be responsible for
            any damage, loss or injury resulting from hacking, tampering or
            other unauthorized access or use of the service or your account or
            the information contained therein
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            5. License of limited use
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            5.1 General
          </Typography>
          <Typography variant="body1">
            Kamui File is the exclusive owner of all of the rights to the web
            application which allows the functionalities offered online and, in
            particular, the right to total or partial reproduction, by any
            means, and in any form; the translation, adaptation, arrangement, or
            any other transformation of the program and the reproduction of the
            results of such acts; the distribution in any of the forms admitted
            by law; the right to publish through all types of media: analog and
            digital, online and offline; and the right to the program's use. The
            program's license of use for users does not refer to the
            Intellectual Property rights of the Service, the users remain solely
            authorized to use Service software. For any distinct uses, Kamui
            File S.L. must authorize their exploitation, as in ceding those
            rights to third-parties. Therefore, the execution, reproduction,
            exploitation, alteration, distribution, or public communication of
            the totality of the copyright property of Kamui File remain
            prohibited for uses distinct from those authorized by the current
            Agreement. In particular, it is not permitted to: make copies of the
            program, translate its source code, transform it, or distribute it
            without the precise authorization of Kamui File. The breach of these
            obligations for the Users may lead to, at the discretion of Kamui
            File, the relevant claims established by the relevant copyright
            regulations, the suspension of Service, or the termination of the
            Contract, as established in Clause 6.
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            6. Intellectual and industrial property rights
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            6.1 General
          </Typography>
          <Typography variant="body2">
            The contents of this site, including the contents, brands, logos,
            drawings, texts, images, databases, codes, and any other material
            belong to Kamui File or to third- parties who have authorized their
            use. In a general manner, their utilization with commercial ends,
            their public communication or distribution, or any other form of
            exploitation by any process, such as transformation or alteration,
            all remains prohibited. We expressly disclaim liability for
            consequential damages resulting from using or misusing our services.
            Kamui File are registered trademarks.
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            7. Termination
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            7.1 General
          </Typography>
          <Typography variant="body2">
            Kamui File will be capable of unilaterally and, at any point,
            resolving the current Contract in the following cases. a) In the
            event that the User breaches any of the obligations and guarantees
            established in this Agreement. b) If intellectual property rights or
            any other third-party rights are infringed upon. c) If User fails to
            make the timely payment of fees for the Software or the Services. d)
            If we are required to do so by law (for example, if providing
            software to a specific region becomes unlawful) e) If we choose to
            discontinue the Services or Software, in whole or in part, (such as
            if it becomes impractical for us to provide Service or our website
            becomes censored in a region). The resolution of the Contract will
            not affect the ability of Kamui File to claim the corresponding
            damages and losses. Users will be qualified to cancel their account,
            at any point, from their Account page or through the contact form
            available online.
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            8. Claims
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            8.1 General
          </Typography>
          <Typography variant="body2">
            In case of claims and complaints stemming from the current Contract,
            or to request information about the Service, the User will be able
            to contact Kamui File through the online form.
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            9. Miscellaneous
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            9.1 General
          </Typography>
          <Typography variant="body2">
            The User will not be able to cede, subrogate, or transmit the rights
            contained in the current Contract to third parties without the
            previous written consent of Kamui File. Same as the previous point.
            We are a registered trademark, you can't copy our brand identity.
            The offense or delay in the exercise of any right or in the demand
            for the completion of any of the obligations arising from this
            Contract will not constitute a renunciation of that right or demand
            for the completion of the obligation, nor the renunciation of any
            other rights or demands for the completion of obligations. This
            Contract, including the Privacy Policy which will be incorporated
            for reference into the current Contract, constitutes the final,
            complete, and exclusive agreement between the parties in relation to
            the object of the Contract, and substitutes any of the previous
            agreements or negotiations between said parties. If any of the
            clauses of the present Contract might become null due to a
            contravention of the applicable legislation, said clause will be
            assumed not to be in effect, but will not affect the rest of the
            Contract, which will be assumed to be in full effectivity and
            validity between the parties.
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="h4" sx={{ my: 3 }}>
            10. Applicable legislation and jurisdiction
          </Typography>
          <Typography variant="h6" sx={{ my: 1.5 }}>
            10.1 General
          </Typography>
          <Typography variant="body2">
            The current Contract has a commercial character and should be
            interpreted and complied with according to its terms, and, in case
            of the unexpected, will be regulated by South Korea law. In the
            steps permitted by governing laws, for the resolution of any
            controversies deriving from the validity, interpretation,
            completion, or execution of this Contract, the parties, with express
            resignation to any other jurisdiction to which they may correspond,
            expressly subject themselves to the jurisdiction and power of the
            judges and courts of South Korea.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "seo_about"])),
    },
  };
};
