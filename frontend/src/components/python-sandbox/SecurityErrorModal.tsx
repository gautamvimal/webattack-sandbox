// import { XCircle, MessageCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";

// interface SecurityErrorModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAskAI: () => void;
// }

// export const SecurityErrorModal = ({
//   isOpen,
//   onClose,
//   onAskAI,
// }: SecurityErrorModalProps) => {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="bg-cyber-bg-card border-cyber-error/50 max-w-md">
//         <DialogHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <XCircle className="w-16 h-16 text-cyber-error" />
//           </div>
//           <DialogTitle className="text-2xl text-cyber-error text-center">
//             Security Error Detected
//           </DialogTitle>
//           <DialogDescription className="text-cyber-text-muted text-center mt-2">
//             This code execution resulted in a vulnerability.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="mt-6 flex justify-center">
//           <Button
//             onClick={onAskAI}
//             className="bg-cyber-accent hover:bg-cyber-accent-glow text-cyber-bg font-semibold px-6 py-2 transition-all duration-300 hover:shadow-[0_0_20px_hsl(175,80%,50%,0.4)]"
//           >
//             <MessageCircle className="w-4 h-4 mr-2" />
//             Ask AI about this error
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
